import { ITokenPayload } from "@helpers/Auth.helper";
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            auth?: ITokenPayload
        }
    }
}