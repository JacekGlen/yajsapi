import { Logger } from "../utils";
import { RequestorApi } from "ya-ts-client/dist/ya-market/api";
import { Agreement as AgreementModel, AgreementStateEnum } from "ya-ts-client/dist/ya-market/src/models";
import { AgreementConfigContainer } from "./agreement_config_container";

export { AgreementStateEnum };

export interface AgreementOptions {
  credentials?: { apiKey?: string; basePath?: string };
  requestTimeout?: number;
  executeTimeout?: number;
  eventPoolingInterval?: number;
  eventPoolingMaxEventsPerRequest?: number;
  logger?: Logger;
}

export interface ProviderInfo {
  providerName: string;
  providerId: string | null;
}

export class Agreement {
  private readonly api: RequestorApi;
  private readonly logger?: Logger;
  private readonly requestTimeout: number;

  private agreementData?: AgreementModel;

  constructor(public readonly id, private readonly configContainer: AgreementConfigContainer) {
    this.logger = configContainer.logger;
    this.api = configContainer.api;
    this.requestTimeout = configContainer.options?.requestTimeout || 10000;
  }

  async refreshDetails() {
    const { data } = await this.api.getAgreement(this.id, { timeout: this.requestTimeout });
    this.agreementData = data;
  }

  getProviderInfo(): ProviderInfo {
    return {
      providerName: this.agreementData?.offer?.properties["golem.node.id.name"] || null,
      providerId: this.agreementData?.offer?.providerId || null,
    };
  }

  async getState(): Promise<AgreementState> {
    await this.refreshDetails();
    return this.agreementData!.state;
  }

  getAgreementData(): AgreementModel | undefined {
    return this.agreementData;
  }

  async confirm() {
    try {
      await this.api.confirmAgreement(this.id);
      await this.api.waitForApproval(this.id, 15);
    } catch (error) {
      this.logger?.error(`Cannot confirm agreement ${this.id}. ${error}`);
      throw error;
    }
  }

  async terminate(reason?: { [key: string]: object }) {
    try {
      await this.api.terminateAgreement(this.id, reason);
      return true;
    } catch (error) {
      this.logger?.error(`Cannot terminate agreement ${this.id}. ${error}`);
      throw error;
    }
  }
}
