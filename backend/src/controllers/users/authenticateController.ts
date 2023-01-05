import { Response } from "express";
import IGetUserAuthInfoRequest from "../../models/IGetUserAuthInfo";

const authenticateController = {
  handleAuthenticateRequest: (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = req.user;
    return res
      .status(200)
      .json({ username: user?.username, email: user?.email });
  },
};

export default authenticateController;
