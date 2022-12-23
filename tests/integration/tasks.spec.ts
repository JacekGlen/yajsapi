import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createExecutor } from "../../yajsapi";
import { LoggerMock } from "../mock";
import { Goth } from "./goth";
import path, { resolve } from "path";
import {readFileSync} from "fs";
chai.use(chaiAsPromised);
const expect = chai.expect;
const logger = new LoggerMock(false);

describe("Task Executor", function () {
  beforeEach(function () {
    logger.clear();
  });

  it("should run simple task", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const result = await executor.run(async (ctx) => ctx.run("echo 'Hello World'"));
    await executor.end();

    expect(result?.stdout).to.include("Hello World");
    expect(logger.logs).to.include("Demand published on the market");
    expect(logger.logs).to.include("New proposal has been received");
    expect(logger.logs).to.include("Scored proposal");
    expect(logger.logs).to.include("Proposal hes been responded");
    expect(logger.logs).to.include("New offer proposal added to pool");
    expect(logger.logs).to.match(/Agreement .* signed with provider/);
    expect(logger.logs).to.match(/Activity .* created/);
    expect(logger.logs).to.include("Task Executor has shut down");
  }).timeout(60000);

  it("should run simple tasks by map function", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const data = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const results = executor.map<string, string>(data, async (ctx, x) => {
      const res = await ctx.run(`echo "${x}"`);
      return res.stdout?.trim();
    });
    const finalOutputs: string[] = [];
    for await (const res of results) if (res) finalOutputs.push(res);
    expect(finalOutputs).to.have.members(data);
    await executor.end();
  }).timeout(90000);

  it("should run simple tasks by forEach function", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const data = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    await executor.forEach(data, async (ctx, x) => {
      const res = await ctx.run(`echo "${x}"`);
      expect(res?.stdout?.trim()).to.be.oneOf(data);
    });
    await executor.end();
  }).timeout(60000);

  it("should run simple batch script and get results as stream", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const outputs: string[] = [];
    let onEnd = "";
    await executor
      .run(async (ctx) => {
        const results = await ctx
          .beginBatch()
          .run('echo "Hello Golem"')
          .run('echo "Hello World"')
          .run('echo "OK"')
          .endStream();
        results.on("data", ({ stdout }) => outputs.push(stdout?.trim()));
        results.on("close", () => (onEnd = "END"));
      })
      .catch((e) => {
        executor.end();
        expect(e).to.be.undefined;
      });
    await logger.expectToInclude('Task 1 finished', 5000)
    expect(outputs[0]).to.equal("Hello Golem");
    expect(outputs[1]).to.equal("Hello World");
    expect(outputs[2]).to.equal("OK");
    expect(onEnd).to.equal("END");
    await executor.end();
  }).timeout(80000);

  it("should run simple batch script and catch error on stream", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const outputs: string[] = [];
    let expectedError = "";
    await executor
      .run(async (ctx) => {
        const results = await ctx.beginBatch().run('echo "Hello Golem"').run('invalid_command').endStream();
        results.on("data", ({ stdout }) => outputs.push(stdout?.trim()));
        results.on("error", (error) => {
          expectedError = error.toString();
        });
      })
      .catch((e) => {
        executor.end();
        expect(e).to.be.undefined;
      });
    await logger.expectToInclude('Task 1 finished', 5000)
    expect(outputs[0]).to.equal("Hello Golem");
    expect(expectedError).to.equal("Error: ExeScript command exited with code 127. Stdout: undefined. Stderr: sh: 1: invalid_command: not found");
    await executor.end();
  }).timeout(80000);

  it("should run simple batch script and get results as promise", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const outputs: string[] = [];
    await executor
      .run(async (ctx) => {
        const results = await ctx
          .beginBatch()
          .run('echo "Hello Golem"')
          .run('echo "Hello World"')
          .run('echo "OK"')
          .end()
          .catch((e) => expect(e).to.be.undefined);
        results.map((r) => outputs.push(r?.stdout?.trim()));
      })
      .catch((e) => {
        executor.end();
        expect(e).to.be.undefined;
      });
    expect(outputs[0]).to.equal("Hello Golem");
    expect(outputs[1]).to.equal("Hello World");
    expect(outputs[2]).to.equal("OK");
    await executor.end();
  }).timeout(60000);

  it("should run simple batch script and catch error on promise", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    let results;
    await executor
        .run(async (ctx) => {
          results = await ctx.beginBatch()
              .run('echo "Hello Golem"')
              .run('invalid_command')
              .end()
              .catch(error => error);
        })
        .catch((e) => {
          executor.end();
          expect(e).to.be.undefined;
        });
    expect(results?.[0]?.stdout?.trim()).to.equal("Hello Golem");
    expect(results?.[1]?.stderr?.trim()).to.equal("sh: 1: invalid_command: not found");
    await executor.end();
  }).timeout(80000);

  it("should run transfer file", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      logger,
    });
    const result = await executor.run(async (ctx) => {
      await ctx.uploadJson({ test: "1234" }, "/golem/work/test.json");
      const res = await ctx.downloadFile("/golem/work/test.json", path.join(__dirname, "new_test.json"));
      return res?.result
    });
    expect(result).to.equal('Ok');
    expect(readFileSync(path.resolve(__dirname, "new_test.json"), 'utf-8')).to.equal('{"test":"1234"}')
    await executor.end();
  }).timeout(60000);
});
