import {
    Package,
    Accounts,
    Allocation,
    Demand,
    DemandEvent,
    DemandEventType,
    Proposal,
    Agreement,
    Activity,
    Result,
    Deploy,
    Run,
    Script,
    Start,
    ConsoleLogger,
    Payments,
    PaymentEventType,
    InvoiceEvent,
    DebitNoteEvent,
    GftpStorageProvider,
    StorageProvider,
    Batch,
} from "yajsapi";

import winston from "winston";
const { combine, timestamp, printf, align } = winston.format;

import * as path from 'path';
import { execSync } from 'child_process';
import { NewLineKind } from "typescript";
import { Logger, sleep, winstonLogger } from "../../dist/utils";

const accounts = await (await Accounts.create()).list();
const accountU = accounts.find((account) => account.driver === "erc20" && account.network === "rinkeby");
if (!accountU) throw new Error("There is no available account");
const account = accountU!;

export class RenderService {
    private job;
    private timeout: number;
    private logger: Logger;
    private jobLogger: winston.Logger;
    private allocation?: Allocation;
    private storageProvider: StorageProvider;
    private demand?: Demand;

    constructor(job: any, settings?: { timeout?: number, logger?: Logger }) {

        this.job = job
        this.timeout = settings?.timeout || 60_000
        this.logger = settings?.logger || winstonLogger
        this.storageProvider = new GftpStorageProvider(logger)

        this.jobLogger = winston.createLogger({
            level: 'debug',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A', }),
                align(),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
            transports: [new winston.transports.File({ filename: `./logs/job-${job.jobId}.log` })]
        })

        this.jobLogger.info(`JG: Starting render task for job ${job.jobId}`)
    }

    public async executeRenderTask(): Promise<void> {

        this.allocation = await Allocation.create({ account, logger: this.logger });

        const proposal = await this.getProposal();
        const results = await this.executeProposal(proposal);

        this.logger.info(`JG: Results: ${JSON.stringify(results, null, 2)}`);

        await this.allocation.release();
        logger.info("JG: Allocation released");
    }

    private async getProposal(): Promise<Proposal> {
        const taskPackage = await Package.create({
            imageHash: "3c744aa70415ea82c929a09a3faf81b2711eda12447f3e025a3f9745",
            minCpuCores: 1,
            minMemGib: 1,
            minStorageGib: 1,
        });
        this.logger.info('JG: Created package')
        this.demand = await Demand.create(taskPackage, [this.allocation!], { logger: this.logger });
        this.logger.info('JG: Created demand')


        const offersFound: Proposal[] = await new Promise((response) => {
            this.logger.info(`JG: Waiting for offers...`);
            const offers: Proposal[] = [];

            const proposalsTimeout = setTimeout(() => {
                this.logger.info(`JG: Timeout reached getProposal`);
                response(offers)
            }, this.timeout);

            this.demand!.addEventListener(DemandEventType, async (event) => {
                const proposalEvent = event as DemandEvent;
                if (proposalEvent.proposal.isInitial())
                    await proposalEvent.proposal.respond(account.platform).catch((e) => this.logger.debug(e));
                else if (proposalEvent.proposal.isDraft()) {
                    //proposalEvent.proposal.score = providersScoring.get(proposalEvent.proposal.issuerId) || null;
                    offers.push(proposalEvent.proposal);
                    //this.logger.info(`Received offer ${JSON.stringify(proposalEvent, null, 2)}}`);
                    this.logger.info(`JG: Received offer ${proposalEvent.proposal.properties["golem.node.id.name"]}`);
                    clearTimeout(proposalsTimeout);
                    response(offers);
                }
            });

            //return offers;
        });

        this.logger.info(`JG: Received ${offersFound.length} offers`);
        await this.demand.unsubscribe();
        this.logger.info(`JG: Unsubscribed from demand`);

        if (offersFound.length === 0) throw new Error("No offers found");

        return offersFound[0];
    }

    private async executeProposal(proposal: Proposal): Promise<Result[]> {
        const processPayment = (event) => {
            if (event instanceof InvoiceEvent && event?.invoice?.agreementId == agreement.id)
            {
                event?.invoice?.accept(event?.invoice?.amount, this.allocation!.id).catch((e) => this.logger.warn(e));
                amountPaid += Number(event?.invoice?.amount);
                this.logger.info(`JG: Invoice accepted: ${event?.invoice?.amount} / ${amountPaid}`);
            }

            if (event instanceof DebitNoteEvent) {
                event?.debitNote?.accept(event?.debitNote?.totalAmountDue, this.allocation!.id).catch((e) => this.logger.warn(e));
                this.logger.info("JG: DebitNote accepted")
            }
        };

        let amountPaid = 0;
        const payments = await Payments.create({ logger: this.logger, debitNotesFetchingInterval: 10_000, invoiceFetchingInterval: 10_000 });
        payments.addEventListener(PaymentEventType, processPayment);
        this.logger.info(`JG: Payments created`);

        const agreement = await Agreement.create(proposal.id, { logger: this.logger });
        await agreement.confirm();
        this.logger.info(`JG: Agreement confirmed`);
        this.logger.info(`JG: Aggreement state: ${ await agreement.getState()}`)

        const activity = await Activity.create(agreement.id, { logger: this.logger, activityExecuteTimeout: 1800_000 }); // 30 minutes
        this.logger.info(`JG: Activity created`);

        const script = await Script.create([new Deploy(), new Start()]);
        script.add(new Run("/bin/sh", ["-c", "date +\"Timestamp|File downloaded|%d-%m-%Y %T.%N %Z\""]))
        this.logger.info(`JG: Aggreement state: ${await agreement.getState()}`)

        const results = await this.executeScript(script, activity);
        // this.logger.info(`JG: Results: ${JSON.stringify(results, null, 2)}`);

        this.logger.info(`JG: Stopping activity`);
        activity.stop();
        this.logger.info(`JG: Aggreement state: ${await agreement.getState()}`)

//        await this.demand?.unsubscribe();
        await agreement.terminate();
        this.logger.info(`JG: Aggreement state: ${await agreement.getState()}`)
        this.logger.info(`JG: Agreement terminated`);


        // eslint-disable-next-line no-async-promise-executor
        await new Promise(async (res) => {
            const paymentsTimeout = setTimeout(res, 30_000)

            // wait 20s for completing payments
            let timeout = false;
            this.logger.info(`JG: Current amount paid: ${amountPaid}`);
            const paymentsCompletionTimeout = setTimeout(() => {
                timeout = true
                this.logger.info(`JG: Payments timeout reached`)
            }, 20_000)
            while (!amountPaid && !timeout) await sleep(2_000, true)
            this.logger.info("JG: Payments completed")
            clearTimeout(paymentsCompletionTimeout)

            payments.removeEventListener(PaymentEventType, processPayment);
            await payments.unsubscribe();
            this.logger.info(`JG: Final amount paid: ${amountPaid}`);
            this.logger.info(`JG: Payments unsubscribed`);
            clearTimeout(paymentsTimeout);
            res('done');
        });

        this.logger.info(`JG: execute Finished`);

        return results
    }

    private async executeScript(script: Script, activity: Activity): Promise<Result[]> {
        await script.before();
        await sleep(100, true);
        const results = await activity.execute(script.getExeScriptRequest());
        const allResults: Result[] = [];
        return new Promise((res, rej) => {
            results.on("data", (res) => {
                allResults.push(res);
                if (res.result === "Error") {
                    script.after();
                    return rej(`Error on command ${res.index}: ${res.message}`);
                }
            });
            results.on("end", () => {
                script.after();
                res(allResults);
            });
            results.on("error", (error) => {
                script.after();
                rej(error);
            });
        });
    }
}

// temporary code to run the example

const job = {
    jobId: "job-1",
}

const logger = winstonLogger;
logger.setLevel('debug')

const renderService = new RenderService(job, { logger });
await renderService.executeRenderTask().catch((e) => console.error(e));
logger.info("JG: Finished");

// agreement.provider.id
// proposal.properties["golem.node.id.name"]