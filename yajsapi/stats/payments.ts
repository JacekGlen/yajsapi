import { AbstractAggregator } from "./abstract_aggregator";
import { Events } from "../events";

export interface PaymentInfo {
  id: string;
  providerId: string;
  agreementId: string;
  amount: number;
}

export class Payments extends AbstractAggregator<Events.PaymentAccepted, PaymentInfo> {
  beforeAdd(event: Events.PaymentAccepted): PaymentInfo {
    return {
      ...event.detail,
      amount: parseFloat(event.detail.amount),
    };
  }
}
