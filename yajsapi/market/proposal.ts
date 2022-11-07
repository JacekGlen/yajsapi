import { OfferProposal } from "../rest/market";
import { Agreement } from "./agreement";

export class Proposal {
    ts: Date;
    score: number;
    proposal: OfferProposal;

    constructor(ts: Date, score: number, proposal: OfferProposal) {
        this.ts = ts;
        this.score = score;
        this.proposal = proposal;
    }

    async createAgreement() {
        const marketAgreement = await this.proposal.create_agreement();
        return new Agreement(marketAgreement.id());
    }
}