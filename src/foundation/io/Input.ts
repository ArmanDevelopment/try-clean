import { Request } from "express";
import {InputHandlerInterface} from "../interfaces/InputHandlerInterface"

export class Input implements InputHandlerInterface {
    constructor(private request: Request) {
    }
    
    getInput(): object {
        return {
            ... this.request.query,
            ... this.request.params,
            ... this.request.body,
            ... this.request.headers
        }
    }
}