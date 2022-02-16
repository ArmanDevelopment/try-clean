"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
class Output {
    constructor(response, nextHandler) {
        this.response = response;
        this.nextHandler = nextHandler;
    }
    send(response) {
        throw new Error("Method not implemented.");
    }
}
exports.Output = Output;
//# sourceMappingURL=Output.js.map