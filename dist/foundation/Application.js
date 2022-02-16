"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const io_1 = require("./io");
const Router_1 = require("./Router");
class Application extends Router_1.Router {
    constructor(_Input = io_1.Input, _Output = io_1.Output) {
        super(_Input, _Output);
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
    }
    build() {
        return new Promise((resolve, reject) => {
            const { APP_HOST: host = "localhost", APP_PORT: port = "3000" } = process.env;
            this.server.listen(+port, host, () => {
                console.log(`Server is runing => http://${host}:${port}`);
                resolve(this);
            });
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map