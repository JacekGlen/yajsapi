import { program } from "commander";
import {
  Accounts,
  Allocation,
  ConsoleLogger,
  Demand,
  DemandEvent,
  DemandEventType,
  Package,
  Proposal,
  Activity,
  Batch,
  GftpStorageProvider,
  Agreement,
  Deploy,
  Script,
  Start,
} from "../../dist/index.js";

program
  .requiredOption("--timeout <timeout>", "timout for collecting offer")
  .requiredOption("--threshold <threshold>", "minimal score");
program.parse();
const options = program.opts();

const logger = new ConsoleLogger();
// disable debug
logger.debug = () => null;

const storageProvider = new GftpStorageProvider(logger);

// primitive scoring database
const providersScoring = new Map<string, number>();
let allocation, demand, agreement, activity;

main(options.timeout, options.threshold);

async function main(timeout: number, threshold: number) {
  await storageProvider.init();
  demand = await prepareAndCreateDemand();
  logger.info("Collecting offers...");
  const offers = await collectOffers(demand, timeout);
  logger.info(`Collect ${offers.length} offers`);
  if (offers.length === 0) {
    logger.warn("No offers in the market meeting the criteria. Exit");
    await terminateAll();
    return;
  }
  const bestOffer = chooseBestOffer(offers, threshold);
  logger.info(
    `The best offer from provider "${bestOffer.properties["golem.node.id.name"]}" with score "${bestOffer.score}" was selected`
  );
  logger.info("Confirm agreement and waiting for the provider to be ready...");
  const [providerId, activity] = await createAndPrepareActivity(bestOffer);
  // TODO:
  // const payments = Payments.create();
  // payments.acceptAll();
  logger.info("Running the task...");
  await runTaskAndScore(activity, providerId);
  logger.info("Work done");
  await terminateAll();
}

async function prepareAndCreateDemand(): Promise<Demand> {
  const taskPackage = await Package.create({
    // example of image hash with linux image
    imageHash: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
    minCpuCores: 1,
    minMemGib: 1,
    minStorageGib: 1,
  });
  const accounts = await (await Accounts.create()).list();
  const account = accounts.find((account) => account?.platform.indexOf("erc20") !== -1);
  if (!account) throw new Error("There is no available account");
  allocation = await Allocation.create({ account, logger });
  return Demand.create(taskPackage, [allocation], { logger });
}

async function collectOffers(demand: Demand, timeout): Promise<Proposal[]> {
  return new Promise((res) => {
    const offers: Proposal[] = [];
    setTimeout(() => res(offers), timeout * 1000);
    demand.addEventListener(DemandEventType, async (event) => {
      const proposalEvent = event as DemandEvent;
      if (proposalEvent.proposal.isInitial())
        await proposalEvent.proposal.respond("erc20-rinkeby-tglm").catch((e) => logger.debug(e));
      else if (proposalEvent.proposal.isDraft()) {
        proposalEvent.proposal.score = providersScoring.get(proposalEvent.proposal.issuerId) || null;
        offers.push(proposalEvent.proposal);
      }
    });
  });
}

function chooseBestOffer(offers: Proposal[], threshold: number): Proposal {
  const sortedOffers = offers.sort((a, b) =>
    a.properties["golem.node.id.name"] > b.properties["golem.node.id.name"] ? 1 : -1
  );
  const firstOfferAboveThreshold = sortedOffers.find((offer) => Number(offer.score) >= threshold);
  if (!firstOfferAboveThreshold) logger.warn("No offers with a minimal score threshold. The first was selected.");
  return firstOfferAboveThreshold || sortedOffers[0];
}

async function createAndPrepareActivity(offer: Proposal): Promise<[string, Activity]> {
  agreement = await Agreement.create(offer.id, { logger });
  await agreement.confirm().catch((e) => {
    throw new Error(e.toString());
  });
  activity = await Activity.create(agreement.id, { logger });
  const script = await Script.create([new Deploy(), new Start()]);
  await activity.execute(script.getExeScriptRequest());
  // wait 60 s. for the activity to be ready
  let timeout = false;
  const timeoutId = setTimeout(() => (timeout = true), 60_000);
  while ((await activity.getState()) !== "Ready" && !timeout) {
    await new Promise((res) => setTimeout(res, 2_000));
  }
  clearTimeout(timeoutId);
  if (timeout) throw new Error(`Unable to prepare activity. Current state: ${await activity.getState()}`);
  return [agreement.provider.id, activity];
}

async function runTaskAndScore(activity: Activity, providerId: string) {
  const batch = await Batch.create(activity, storageProvider, logger);
  const results = await batch
    .uploadFile("./input.txt", "/golem/work/input.txt")
    .run("cat /golem/work/input.txt > /golem/work/output.txt")
    .run("echo 'run some computations with inputs' >> /golem/work/output.txt")
    .downloadFile("/golem/work/output.txt", "./output.txt")
    .end();
  console.log(
    "RESULTS: ",
    results.map((r) => r.result)
  );
  // TODO: evaluate the results - temporary set random score
  const score = Math.floor(Math.random() * 100) + 1;
  scoreProvider(providerId, score);
}

function scoreProvider(providerId: string, score: number) {
  // perhaps some other logic for scoring
  providersScoring.set(providerId, score);
  logger.info(`Provider ID ${providerId} scored ${score}`);
}

async function terminateAll() {
  await Promise.all([
    activity?.stop(),
    agreement?.terminate(),
    demand?.unsubscribe(),
    storageProvider.close(),
    allocation?.release(),
  ]);
}
