import express, { Request, Response, Application as ExpressApplication, NextFunction } from "express"
import http, { Server } from "http"

import { InputHandlerInterface } from "./interfaces/InputHandlerInterface"
import { OutputHandlerInteface } from "./interfaces/OutputHandlerInteface"

import { Input, Output } from "./io"
import { Router } from "./Router"

export class Application extends Router {
    
    protected app: ExpressApplication

    private server: Server

    constructor(
        _Input: { new(req: Request): InputHandlerInterface ;} = Input,
        _Output: { new(res: Response, next: NextFunction): OutputHandlerInteface ;} = Output
    ) {
        super(_Input, _Output)
        this.app = express()
        this.server = http.createServer(this.app)
    }
    
    build(): Promise<Application> {
        return new Promise((resolve, reject) => {
            const {APP_HOST: host = "localhost", APP_PORT: port = "3000"} = process.env

            this.server.listen(+ port, host, () => {
                console.log(`Server is runing => http://${host}:${port}`);
                resolve(this)
            });
        })
    }
}