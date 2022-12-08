import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import getErrorMessage from "../helpers/getErrorMessage";

const registerController = {
  handleRegister: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.json({
        userInfo: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(402).json({ error: "Username or email taken" });
      }
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    }
  },
};

export default registerController;
