import { Request, Response } from "express";
import getErrorMessage from "../../helpers/getErrorMessage";
import User from "../../models/User";

const usersController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find({});

      return res.status(200).json({ users });
    } catch (error) {
      getErrorMessage(error);
      res.status(500).json(error);
    }
  },
};

export default usersController;
