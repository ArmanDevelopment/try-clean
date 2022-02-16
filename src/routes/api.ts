import { Router } from "../foundation/Router";
import { TestController } from "../controllers/TestController"

let router = new Router();

router.group("/v1", router => {
    router.get<TestController>("/test", [TestController, "test"])
});

export default router;
