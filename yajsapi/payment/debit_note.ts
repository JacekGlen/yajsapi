import { BasePaymentOptions, InvoiceConfig } from './config.js';
import { DebitNote as Model } from "ya-ts-client/dist/ya-payment/src/models";
import { BaseNote } from './invoice.js';
import { Events } from '../events/index.js';
import { Rejection } from './rejection.js';

export type InvoiceOptions = BasePaymentOptions;

/**
 * A Debit Note is an artifact issued by the Provider to the Requestor, in the context of a specific Activity. It is a notification of Total Amount Due incurred by the Activity until the moment the Debit Note is issued. This is expected to be used as trigger for payment in upfront-payment or pay-as-you-go scenarios. NOTE: Only Debit Notes with non-null paymentDueDate are expected to trigger payments. NOTE: Debit Notes flag the current Total Amount Due, which is accumulated from the start of Activity. Debit Notes are expected to trigger payments, therefore payment amount for the newly received Debit Note is expected to be determined by difference of Total Payments for the Agreement vs Total Amount Due.
 * @category Mid-level
 */
export class DebitNote extends BaseNote<Model> {
  public readonly id: string;
  public readonly previousDebitNoteId?: string;
  public readonly timestamp: string;
  public readonly activityId: string;
  public readonly totalAmountDue: string;
  public readonly usageCounterVector?: object;

  /**
   * Create Debit Note Model
   *
   * @param debitNoteId - debit note id
   * @param options - {@link InvoiceOptions}
   */
  static async create(debitNoteId: string, options?: InvoiceOptions): Promise<DebitNote> {
    const config = new InvoiceConfig(options);
    const { data: model } = await config.api.getDebitNote(debitNoteId);
    return new DebitNote(model, config);
  }

  /**
   *
   * @param model
   * @param options
   * @protected
   * @hidden
   */
  protected constructor(model: Model, protected options: InvoiceConfig) {
    super(model, options);
    this.id = model.debitNoteId;
    this.timestamp = model.timestamp;
    this.activityId = model.activityId;
    this.totalAmountDue = model.totalAmountDue;
    this.usageCounterVector = model.usageCounterVector;
  }

  /**
   * Accept Debit Note
   *
   * @param totalAmountAccepted
   * @param allocationId
   */
  async accept(totalAmountAccepted: string, allocationId: string) {
    try {
      await this.options.api.acceptDebitNote(this.id, { totalAmountAccepted, allocationId });
    } catch (e) {
      const reason = e?.response?.data?.message || e;
      this.options.eventTarget?.dispatchEvent(
        new Events.PaymentFailed({ id: this.id, agreementId: this.agreementId, reason })
      );
      throw new Error(`Unable to accept debit note ${this.id} ${e?.response?.data?.message || e}`);
    }
  }

  /**
   * Reject Debit Note
   *
   * @param rejection - {@link Rejection}
   */
  async reject(rejection: Rejection) {
    try {
      await this.options.api.rejectDebitNote(this.id, rejection);
    } catch (e) {
      throw new Error(`Unable to reject debit note ${this.id} ${e?.response?.data?.message || e}`);
    } finally {
      this.options.eventTarget?.dispatchEvent(
        new Events.PaymentFailed({ id: this.id, agreementId: this.agreementId, reason: rejection.message })
      );
    }
  }

  protected async refreshStatus() {
    const { data: model } = await this.options.api.getDebitNote(this.id);
    this.status = model.status;
  }
}
