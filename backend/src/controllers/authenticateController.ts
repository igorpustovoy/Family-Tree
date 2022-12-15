import { Response } from "express";

const authenticateController = {
  handleAuthenticateRequest: (req: any, res: Response) => {
    const user = req.user;
    return res.status(200).json({ username: user.username, email: user.email });
  },
};

export default authenticateController;
