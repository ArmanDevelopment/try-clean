"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = require("express");
class Router {
    constructor(Input = Input, Output = Output) {
        this.Input = Input;
        this.Output = Output;
        this.middlewares = [];
        this.app = (0, express_1.Router)();
    }
    get router() {
        return this.app;
    }
    get(path, hander) {
        return this.register("get", path, hander);
    }
    head(path, hander) {
        return this.register("head", path, hander);
    }
    post(path, hander) {
        return this.register("post", path, hander);
    }
    put(path, hander) {
        return this.register("put", path, hander);
    }
    delete(path, hander) {
        return this.register("delete", path, hander);
    }
    group(path, grouper) {
        const router = new Router;
        grouper(router);
        return this.use(path, router);
    }
    use(first, app) {
        if (typeof first == 'string') {
            this.router.use(first, this.middlewares, app.router);
        }
        else {
            this.middleware(first);
            this.router.use(this.middlewares);
        }
        this.middlewares = [];
        return this;
    }
    register(method, path, [Controller, handler]) {
        this.router[method](path, this.middlewares, this.wrap("action", [Controller, handler]));
        this.middlewares = [];
        return this;
    }
    middleware(handler) {
        this.middlewares.push(this.wrap("action", handler));
        return this;
    }
    wrap(type, [Controller, handler]) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const controller = new Controller;
            const input = new this.Input(req).getInput();
            const props = new Array(controller[handler].length).fill(input);
            try {
                const result = yield controller[handler].apply(controller, props);
                if (type === "action")
                    new this.Output(res, next).send(result);
                else
                    next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map