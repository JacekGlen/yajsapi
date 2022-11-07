import { Logger } from "../utils";
import { EventBus } from "../executor/event_bus";
import { AgreementsPool as AgreementPoolOld } from "../executor/agreements_pool";
import { Agreement } from "./agreement";
import { Proposal } from "./proposal";

import {
    OfferProposal as MarketOfferProposal,
    TerminationReason as MarketTerminationReason
} from "../rest/market";

type AgreementsPool = {
    inUse: Array<Agreement>,
    available: Array<Agreement>,
    terminated: Array<Agreement>,
}

type ProposalsPool = {
    available: Array<Proposal>,
    used: Array<Proposal>,
}

export class AgreementsPoolService {
    private proposals: ProposalsPool = {
        available: [],
        used: []
    }
    private agreements: AgreementsPool = {
        inUse: [],
        available: [],
        terminated: []
    }
    private agreementPoolOld: AgreementPoolOld;

    constructor(private eventBus: EventBus, private logger?: Logger) {
        this.agreementPoolOld = new AgreementPoolOld(eventBus, logger);
        this.registerEventListeners();
    }

    private registerEventListeners() {
        //this.eventBus.on('NewOffer',e => this.addProposal(e))
    }

    private getAndLockAvailableAgreement() {
        const agreement = this.agreements.available.pop();

        if(agreement) {
            this.agreements.inUse.push(agreement);
        }

        return agreement;
    }

    private getAndUseAvailableProposal() {
        const proposal = this.proposals.available.pop();

        if(proposal) {
            this.proposals.used.push(proposal);
        }

        return proposal;
    }

    async get(): Promise<Agreement> {
        let availableAgreement = this.getAndLockAvailableAgreement();
        if (availableAgreement) {
            this.logger?.debug(`Reusing agreement. id: ${availableAgreement.getId()}`);
        } else {
            const proposal = this.getAndUseAvailableProposal();
            if (proposal) {
                availableAgreement = await proposal.createAgreement();
            }
        }

        return new Promise<Agreement>((resolve, reject) => {
            if(availableAgreement) {
                resolve(availableAgreement)
            } else {
                reject();
            }
        });
    }

    private findIndexById(id) {
        return (e) => e.getId() === id
    }

    private takeAndRemoveElementFromArrayById<T>(array: Array<T>, id) : [T | undefined, Array<T>] {
        const index = array.findIndex(this.findIndexById(id));
        const element = array[index];
        if (index > -1) {
            array.splice(index, 1);
        }
        return [element, array];
    }

    async releaseAgreementById(agreementId: string) {
        const [agreement, inUseAgreements] = this.takeAndRemoveElementFromArrayById(this.agreements.inUse, agreementId)
        this.agreements.inUse = inUseAgreements;

        if (agreement) {
            this.agreements.available.push(agreement);
        }
    }

    async terminateAgreementById(agreementId: string, reason: MarketTerminationReason) {
        const [agreement, inUseAgreements] = this.takeAndRemoveElementFromArrayById(this.agreements.inUse, agreementId)
        this.agreements.inUse = inUseAgreements;

        if (agreement) {
            this.agreements.terminated.push(agreement);
        }
        //await this.agreementPoolOld.release_agreement(agreementId);
    }

    async terminateAll(reason: MarketTerminationReason) {
        return Promise.all(this.agreements.available.map(agreement => this.terminateAgreementById(agreement.getId(), reason)))
        //await this.agreementPoolOld.terminate_all(reason);
    }

    addProposal(score: number, proposal: MarketOfferProposal) {
        this.proposals.available.push(new Proposal(new Date(), score, proposal));
    }
}