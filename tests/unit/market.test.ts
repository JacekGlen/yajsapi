import chai from "chai";
import chaiUuid from "chai-uuid";
import chaiAsPromised from "chai-as-promised";
import {Activity, ActivityFactory} from "../../yajsapi/activity";
chai.use(chaiUuid);
chai.use(chaiAsPromised);

const expect = chai.expect;

describe("#Market", () => {
    before(() => {
        process.env.YAGNA_APPKEY = "test";
        process.env.YAGNA_API_BASEPATH = "http://127.0.0.1:7465/activity-api/v1";
    });
    describe('Agreement()', function () {
        it("create agreement", async () => {
            const activity = await factory.create("test_agreement_id");
            expect(activity).to.be.instanceof(Activity);
            expect(activity.id).to.be.a.guid();
        });
    }
});