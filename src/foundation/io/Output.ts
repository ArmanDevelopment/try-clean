import { NextFunction, response, Response } from "express";
import {OutputHandlerInteface} from "../interfaces/OutputHandlerInteface"

export class Output implements OutputHandlerInteface{
    constructor(private response: Response, private nextHandler: NextFunction){
    }

    send(response: any): void {
        switch(typeof response) {
            case "boolean":
            case "number":
                this.response.json({success: true, result: response});
            case "string":
                this.response.json({success: true, message: response});
            case "object":
                this.response.json({success: true, data: response});
            default:
                this.response.json({success: true});
        }
    }
}