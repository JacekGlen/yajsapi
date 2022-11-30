import { Allocation } from "../../yajsapi/payment/allocation";
import { PaymentService } from "../../yajsapi/payment";
import { allocationMock } from "../mock";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const paymentServiceMock: PaymentService = {
  async createAllocations(
    budget?,
    payment?: { driver: string; network: string },
    timeout?: number
  ): Promise<Allocation[]> {
    return Promise.resolve([allocationMock]);
  },
  acceptPayments(id: string) {
    return true;
  },
};
