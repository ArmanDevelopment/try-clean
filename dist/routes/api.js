"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../foundation/Router");
const TestController_1 = require("../controllers/TestController");
let router = new Router_1.Router();
router.group("/v1", router => {
    router.register("get", "/test", [TestController_1.TestController, "test"]);
});
exports.default = router;
//# sourceMappingURL=api.js.map