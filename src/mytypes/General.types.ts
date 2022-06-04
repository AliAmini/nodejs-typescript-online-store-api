import { ITokenPayload } from "@helpers/Auth.helper";
import { Request } from "express";

export interface IAuthenticatedRequest extends Request {
  auth: ITokenPayload
}