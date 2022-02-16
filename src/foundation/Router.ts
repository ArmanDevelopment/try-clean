import {InputHandlerInterface} from "./interfaces/InputHandlerInterface"
import {OutputHandlerInteface} from "./interfaces/OutputHandlerInteface"

import {RequestHandler, Request, Response, NextFunction, Router as ExpressRouter} from "express"
import {Input, Output} from "./io"
import methods from "methods"


type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V? P: never]: any
}

type Handler<T> = [{ new(): any }, KeyOfType<T, Function>]

type Methods = typeof methods[0] & keyof ExpressRouter


export class Router {
    private middlewares: RequestHandler[] = []

    protected app: ExpressRouter = ExpressRouter()

    get router() {
        return this.app
    }

    constructor(
        private Input: { new(req: Request): InputHandlerInterface ;} = Input,
        private Output: { new(res: Response, next: NextFunction): OutputHandlerInteface ;} = Output) {
    }

    public get<T>(path: string, hander: Handler<T>) {
        return this.register("get", path, hander);
    }

    public head<T>(path: string, hander: Handler<T>) {
        return this.register("head", path, hander);
    }

    public post<T>(path: string, hander: Handler<T>) {
        return this.register("post", path, hander);
    }

    public put<T>(path: string, hander: Handler<T>) {
        return this.register("put", path, hander);
    }

    public delete<T>(path: string, hander: Handler<T>) {
        return this.register("delete", path, hander);
    }

    public group(path: string, grouper: (router: Router) => void, router = new Router) {
        grouper(router)
        return this.use(path, router)
    }

    public use(path: string, router: Router): this;
    public use<T>(handler: Handler<T>): this;
    public use(first: any, app?: any) {
        if(typeof first == 'string') {
            this.router.use(first, this.middlewares, app.router);
        }
        else {
            this.middleware(first)
            this.router.use(this.middlewares)
        }

        this.middlewares = []
        return this
    }

    private register<T> (method: Methods, path: string, [Controller, handler]: Handler<T>) {
        this.router[method] (path, this.middlewares, this.wrap<T>("action", [Controller, handler]))
        this.middlewares = []

        return this
    }

    public middleware<T>(handler: Handler<T>) {
        this.middlewares.push(this.wrap<T>("action", handler));

        return this
    }

    private wrap<T>(type: "middleware" | "action", [Controller, handler]: Handler<T>): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const controller = new Controller
            const input = new this.Input(req).getInput()
            
            const props = new Array(controller[handler].length).fill(input)

            try {
                const result = await controller[handler].apply(controller, props)

                if(type === "action")
                    new this.Output(res, next).send(result)
                else
                    next()
            }
            catch (error) {
                next(error)
            }
        }
    }
}