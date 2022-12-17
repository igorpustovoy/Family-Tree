import { Response } from "express";
import { io } from "../..";
import getErrorMessage from "../../helpers/getErrorMessage";
import Conversation from "../../models/Conversation";
import User from "../../models/User";

const conversationController = {
  getConversations: async (req: any, res: Response) => {
    try {
      const conversations = await User.findOne({
        username: req.user.username,
      }).populate("conversations");

      if (!conversations) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ conversations });
    } catch (error) {
      getErrorMessage(error);
      res.status(500).json(error);
    }
  },

  sendMessage: async (req: any, res: Response) => {
    const { message, recipient } = req.body;
    const sender = req.user.username;
    try {
      io.emit(`private_message_${recipient}`, { message, author: sender });
      io.emit(`private_message_${sender}`, { message, author: sender });

      const conversation = await Conversation.findOne({
        $or: [
          { participants: [sender, recipient] },
          { participants: [recipient, sender] },
        ],
      });

      if (!conversation) {
        const newConversation = await Conversation.create({
          participants: [sender, recipient],
          messages: [],
        });

        await User.findOneAndUpdate(
          { username: sender },
          { $push: { conversations: newConversation._id } }
        );

        await User.findOneAndUpdate(
          { username: recipient },
          { $push: { conversations: newConversation._id } }
        );

        newConversation.messages.push({ author: sender, message });

        await newConversation.save();

        return res.status(200).send();
      }

      conversation.messages.push({ author: sender, message });

      await conversation.save();

      return res.status(200).send();
    } catch (error) {
      getErrorMessage(error);
      res.status(500).json(error);
    }
  },
};

export default conversationController;
