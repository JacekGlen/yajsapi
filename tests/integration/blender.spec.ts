import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createExecutor } from "../../yajsapi";
import { LoggerMock } from "../mock";
import { Goth } from "./goth";
import { resolve } from "path";
chai.use(chaiAsPromised);
const expect = chai.expect;
const logger = new LoggerMock(false);
import path from "path";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
const gothConfig = resolve("../goth/assets/goth-config-testing.yml");
const goth = new Goth(gothConfig);

const blender_params = (frame) => ({
    scene_file: "/golem/resource/scene.blend",
    resolution: [400, 300],
    use_compositing: false,
    crops: [
        {
            outfilebasename: "out",
            borders_x: [0.0, 1.0],
            borders_y: [0.0, 1.0],
        },
    ],
    samples: 100,
    frames: [frame],
    output_format: "PNG",
    RESOURCES_DIR: "/golem/resources",
    WORK_DIR: "/golem/work",
    OUTPUT_DIR: "/golem/output",
});

describe("Blender rendering", function () {
  this.timeout(80000);
    let apiKey, basePath, subnetTag, gsbUrl;
    before(async function() {
        this.timeout(60000);
        ({ apiKey, basePath, subnetTag, gsbUrl } = await goth.start().catch(e => {
            console.error(e);
            throw e;
        }));
        logger.clear();
    });
    after(async () => {
        await goth.end();
    });

  it("should render images by blender", async () => {
    const executor = await createExecutor({
      package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
      yagnaOptions: { apiKey, basePath },
      subnetTag,
      logger,
    });
    executor.beforeEach(async (ctx) => {
      await ctx.uploadFile(path.join(__dirname, "../mock/fixtures/cubes.blend"), "/golem/resource/scene.blend");
    });
    const data = [0, 10, 20, 30, 40, 50];
    const results = executor.map<number, string>(data, async (ctx, frame) => {
      const result = await ctx
        .beginBatch()
        .uploadJson(blender_params(frame), "/golem/work/params.json")
        .run("/golem/entrypoints/run-blender.sh")
        .downloadFile(
          `/golem/output/out${frame?.toString().padStart(4, "0")}.png`,
          path.join(__dirname, `./output_${frame}.png`)
        )
        .end()
        .catch((error) => console.error(error));
      return result ? `output_${frame}.png` : "";
    });
    const expectedResults = data.map((d) => `output_${d}.png`);
    for await (const result of results) expect(result).to.be.oneOf(expectedResults);
    for (const file of expectedResults) expect(fileExistsSync(path.resolve(__dirname, file))).to.be.true;
    await executor.end();
  }).timeout(180000);
});
