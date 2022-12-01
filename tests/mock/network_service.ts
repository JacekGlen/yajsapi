import { NetworkService } from "../../yajsapi/network";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const networkServiceMock: NetworkService = {
  async addNode(nodeId: string, ip?: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  async end(): Promise<void> {
    return Promise.resolve(undefined);
  },
  async run(address: string): Promise<void> {
    return Promise.resolve(undefined);
  },
};
