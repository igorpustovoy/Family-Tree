import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import getErrorMessage from "../helpers/getErrorMessage";
require("dotenv").config();

const loginController = {
  handleLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).lean();

      if (!user) {
        return res.status(401).json({ error: { userFound: false } });
      }

      if (await bcrypt.compare(password, user.password)) {
        await User.findOneAndUpdate({ email }, user);

        return res.json({
          userInfo: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      }

      return res.status(401).json({ error: { userFound: false } });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    }
  },
};

export default loginController;
