import { Request } from "express";

interface IGetUserAuthInfoRequest extends Request {
  user?: {
    username?: string;
    email?: string;
  };
}

export default IGetUserAuthInfoRequest;
