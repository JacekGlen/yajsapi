import { AbstractAggregator } from "./abstract_aggregator";
import { Events } from "../events";

export interface InvoiceInfo {
  id: string;
  providerId: string;
  agreementId: string;
  amount: number;
}
interface Payload {
  id: string;
  providerId: string;
  agreementId: string;
  amount: string;
}

export class Invoices extends AbstractAggregator<Payload, InvoiceInfo> {
  beforeAdd(payload): InvoiceInfo {
    return {
      ...payload,
      amount: parseFloat(payload.amount),
    };
  }
}
