import { Package } from "../package/index.js";
import { Allocation } from "../payment/index.js";
import { YagnaOptions } from "../executor/index.js";
import { DemandFactory } from "./factory.js";
import { Proposal } from "./proposal.js";
import { Logger, sleep } from "../utils/index.js";
import { DemandConfig } from "./config.js";
import { Events } from "../events/index.js";
import { ProposalEvent } from "ya-ts-client/dist/ya-market/src/models/index.js";
import { DemandOfferBase } from "ya-ts-client/dist/ya-market/index.js";

/**
 * @category Mid-level
 */
export interface DemandOptions {
  subnetTag?: string;
  yagnaOptions?: YagnaOptions;
  marketTimeout?: number;
  marketOfferExpiration?: number;
  logger?: Logger;
  maxOfferEvents?: number;
  offerFetchingInterval?: number;
  proposalTimeout?: number;
  eventTarget?: EventTarget;
}

/**
 * Event type with which all offers and proposals coming from the market will be emitted.
 * @category Mid-level
 */
export const DemandEventType = "ProposalReceived";

/**
 * Demand module - an object which can be considered an "open" or public Demand, as it is not directed at a specific Provider, but rather is sent to the market so that the matching mechanism implementation can associate relevant Offers.
 * It is a special entity type because it inherits from the `EventTarget` class. Therefore, after creating it, you can add listeners to it, which will listen to offers from the market on an event of a specific type: `DemandEventType`.
 * @category Mid-level
 */
export class Demand extends EventTarget {
  private isRunning = true;
  private logger?: Logger;

  /**
   * Create demand for given taskPackage
   * Note: it is an "atomic" operation, ie. as soon as Demand is created, the subscription is published on the market.
   * @param taskPackage - {@link Package}
   * @param allocations - {@link Allocation}
   * @param options - {@link DemandOptions}
   * @return Demand
   */
  static async create(taskPackage: Package, allocations: Allocation[], options?: DemandOptions): Promise<Demand> {
    const factory = new DemandFactory(taskPackage, allocations, options);
    return factory.create();
  }

  /**
   * @param id - demand ID
   * @param demandRequest - {@link DemandOfferBase}
   * @param options - {@link DemandConfig}
   * @hidden
   */
  constructor(public readonly id, private demandRequest: DemandOfferBase, private options: DemandConfig) {
    super();
    this.logger = this.options.logger;
    this.subscribe().catch((e) => this.logger?.error(e));
  }

  /**
   * Unsubscribe demand from the market
   */
  async unsubscribe() {
    this.isRunning = false;
    await this.options.api.unsubscribeDemand(this.id);
    this.removeEventListener(DemandEventType, null);
    this.logger?.debug(`Demand ${this.id} unsubscribed`);
  }

  private async subscribe() {
    while (this.isRunning) {
      try {
        const { data: events } = await this.options.api.collectOffers(this.id, 3, this.options.maxOfferEvents, {
          timeout: 5000,
        });
        for (const event of events as ProposalEvent[]) {
          if (event.eventType === "ProposalRejectedEvent") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.logger?.debug(`Proposal rejected. Reason: ${event.reason?.message}`);
            continue;
          } else if (event.eventType !== "ProposalEvent") continue;
          const proposal = new Proposal(
            this.id,
            this.options.api,
            event.proposal,
            this.demandRequest,
            this.options.eventTarget
          );
          this.dispatchEvent(new DemandEvent(DemandEventType, proposal));
          this.options.eventTarget?.dispatchEvent(
            new Events.ProposalReceived({ id: proposal.id, providerId: proposal.issuerId })
          );
        }
      } catch (error) {
        if (this.isRunning) {
          const reason = error.response?.data?.message || error;
          this.options.eventTarget?.dispatchEvent(new Events.CollectFailed({ id: this.id, reason }));
          this.logger?.warn(`Unable to collect offers. ${reason}`);
        }
      } finally {
        await sleep(this.options.offerFetchingInterval, true);
      }
    }
  }
}

/**
 * @category Mid-level
 */
export class DemandEvent extends Event {
  readonly proposal: Proposal;

  /**
   * Create a new instance of DemandEvent
   * @param type A string with the name of the event:
   * @param data object with proposal data:
   */
  constructor(type, data) {
    super(type, data);
    this.proposal = data;
  }
}
