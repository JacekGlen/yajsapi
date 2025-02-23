import * as activityMock from "../mock/rest/activity.js";
import { expect } from "chai";
import { WorkContext, Worker } from "../../yajsapi/task/index.js";
import { LoggerMock, StorageProviderMock } from "../mock/index.js";
import { Activity, Result } from "../../yajsapi/activity/index.js";
import { Readable } from "stream";
const logger = new LoggerMock();
const storageProviderMock = new StorageProviderMock({ logger });
const isRunning = () => true;

describe("Work Context", () => {
  beforeEach(() => {
    logger.clear();
    activityMock.clear();
  });

  describe("Executing", () => {
    it("should execute run command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result> = async (ctx) => ctx.run("some_shell_command");
      const ctx = new WorkContext(activity, { logger, activityStateCheckingInterval: 10, isRunning });
      await ctx.before();
      const results = await worker(ctx);
      expect(results?.stdout).to.equal("test_result");
    });

    it("should execute upload file command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result> = async (ctx) => ctx.uploadFile("./file.txt", "/golem/file.txt");
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      await ctx.before();
      const results = await worker(ctx);
      expect(results?.stdout).to.equal("test_result");
      await logger.expectToInclude("File published: ./file.txt");
      await logger.expectToInclude("Urls released");
    });

    it("should execute upload json command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result> = async (ctx) => ctx.uploadJson({ test: true }, "/golem/file.txt");
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      await ctx.before();
      const results = await worker(ctx);
      expect(results?.stdout).to.equal("test_result");
      await logger.expectToInclude("Json published");
      await logger.expectToInclude("Urls released");
    });

    it("should execute download file command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result> = async (ctx) => ctx.downloadFile("/golem/file.txt", "./file.txt");
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      await ctx.before();
      const results = await worker(ctx);
      expect(results?.stdout).to.equal("test_result");
      await logger.expectToInclude("File received: ./file.txt");
    });
  });
  describe("Batch", () => {
    it("should execute batch as promise", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result[]> = async (ctx) => {
        return ctx
          .beginBatch()
          .run("some_shell_command")
          .uploadFile("./file.txt", "/golem/file.txt")
          .uploadJson({ test: true }, "/golem/file.txt")
          .downloadFile("/golem/file.txt", "./file.txt")
          .end();
      };
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      const expectedStdout = [
        { stdout: "ok_run" },
        { stdout: "ok_upload_file" },
        { stdout: "ok_upload_json" },
        { stdout: "ok_download_file" },
      ];
      activityMock.setExpectedExeResults(expectedStdout);
      const results = await worker(ctx);
      expect(results?.map((r) => r.stdout)).to.deep.equal(expectedStdout.map((s) => s.stdout));
      await logger.expectToInclude("File published: ./file.txt");
      await logger.expectToInclude("Json published");
      await logger.expectToInclude("File received: ./file.txt");
      await logger.expectToInclude("Urls released");
    });

    it("should execute batch as stream", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Readable> = async (ctx) => {
        return ctx
          .beginBatch()
          .run("some_shell_command")
          .uploadFile("./file.txt", "/golem/file.txt")
          .uploadJson({ test: true }, "/golem/file.txt")
          .downloadFile("/golem/file.txt", "./file.txt")
          .endStream();
      };
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      const expectedStdout = [
        { stdout: "ok_run" },
        { stdout: "ok_upload_file" },
        { stdout: "ok_upload_json" },
        { stdout: "ok_download_file" },
      ];
      activityMock.setExpectedExeResults(expectedStdout);
      const results = await worker(ctx);
      await new Promise((res, rej) => {
        results?.on("data", (result) => {
          try {
            expect(result.stdout).to.equal(expectedStdout?.shift()?.stdout);
          } catch (e) {
            rej(e);
          }
        });
        results?.on("end", res);
      });
      await logger.expectToInclude("File published: ./file.txt");
      await logger.expectToInclude("Json published");
      await logger.expectToInclude("File received: ./file.txt");
      await logger.expectToInclude("Urls released");
    });
  });
  describe("Error handling", () => {
    it("should catch error while executing batch as promise with invalid command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Result[]> = async (ctx) => ctx.beginBatch().run("invalid_shell_command").end();
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      const expectedStdout = [{ result: "Error", stderr: "error", message: "Some error occurred" }];
      activityMock.setExpectedExeResults(expectedStdout);
      await expect(worker(ctx)).to.be.rejectedWith(expectedStdout);
    });

    it("should catch error while executing batch as stream with invalid command", async () => {
      const activity = await Activity.create("test_agreement_id");
      const worker: Worker<null, Readable> = async (ctx) => ctx.beginBatch().run("invalid_shell_command").endStream();
      const ctx = new WorkContext(activity, {
        logger,
        activityStateCheckingInterval: 10,
        storageProvider: storageProviderMock,
        isRunning,
      });
      const expectedStdout = [{ result: "Error", stderr: "error", message: "Some error occurred" }];
      activityMock.setExpectedExeResults(expectedStdout);
      const results = await worker(ctx);
      await new Promise((res, rej) => {
        results?.on("error", (error) => {
          try {
            expect(error.message).to.equal("Some error occurred. Stdout: test_result. Stderr: error");
          } catch (e) {
            rej(e);
          }
          res(true);
        });
      });
    });
  });
});
