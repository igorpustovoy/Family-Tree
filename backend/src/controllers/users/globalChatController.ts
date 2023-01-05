import { io } from "./../../index";
import { Response, Request } from "express";
import GlobalChat from "../../models/GlobalChat";
import getErrorMessage from "../../helpers/getErrorMessage";
import IGetUserAuthInfoRequest from "../../models/IGetUserAuthInfo";

const globalChatController = {
  getChat: async (req: Request, res: Response) => {
    try {
      const globalChat = await GlobalChat.findOne({});

      if (!globalChat) {
        await GlobalChat.create({
          messages: [],
        });
      }

      res.status(200).json({ messages: globalChat?.messages });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json(getErrorMessage(error));
    }
  },

  addMessage: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { message } = req.body;
    const author = req.user?.username as string;

    try {
      io.emit(`global_message`, { message, author });

      const globalChat = await GlobalChat.findOne({});

      globalChat?.messages.push({ author, message });

      await globalChat?.save();

      return res.status(200).send();
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json(getErrorMessage(error));
    }
  },
};

export default globalChatController;
