import { io } from "./../../index";
import { Response, Request } from "express";
import GlobalChat from "../../models/GlobalChat";
import getErrorMessage from "../../helpers/getErrorMessage";

const globalChatController = {
  getChat: async (req: Request, res: Response) => {
    try {
      const globalChat = await GlobalChat.find({})[0];

      if (!globalChat) {
        await GlobalChat.create({
          messages: [],
        });
      }

      res.status(200).json({ messages: globalChat.messages });
    } catch (error) {
      getErrorMessage(error);
      res.status(500).json(error);
    }
  },

  addMessage: async (req: any, res: Response) => {
    const { message } = req.body;
    const author = req.user.username;

    try {
      io.emit(`global_message`, { message, author });

      const globalChat = await GlobalChat.find({})[0];

      globalChat.messages.push({ author, message });

      await globalChat.save();

      return res.status(200).send();
    } catch (error) {
      getErrorMessage(error);
      res.status(500).json(error);
    }
  },
};

export default globalChatController;
