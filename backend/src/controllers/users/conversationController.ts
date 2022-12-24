import { Response } from "express";
import { io } from "../..";
import getErrorMessage from "../../helpers/getErrorMessage";
import Conversation from "../../models/Conversation";
import User from "../../models/User";

const conversationController = {
  getConversations: async (req: any, res: Response) => {
    try {
      const user = await User.findOne({
        username: req.user.username,
      }).populate("conversations");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const conversations = user.conversations;

      return res.status(200).json({ conversations });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json(getErrorMessage(error));
    }
  },

  sendMessage: async (req: any, res: Response) => {
    const { message, recipient } = req.body;
    const sender = req.user.username;

    if (!message || !recipient) {
      return res.status(400).json({ error: "Missing message or recipient" });
    }

    try {
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

        console.log("EMITTING TO ", recipient, " AND ", sender);

        io.emit(`private_message_${recipient}`, {
          message,
          author: sender,
          conversationId: newConversation._id,
          participants: newConversation.participants,
        });
        io.emit(`private_message_${sender}`, {
          message,
          author: sender,
          conversationId: newConversation._id,
          participants: newConversation.participants,
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

      io.emit(`private_message_${recipient}`, {
        message,
        author: sender,
        conversationId: conversation._id,
        participants: conversation.participants,
      });
      io.emit(`private_message_${sender}`, {
        message,
        author: sender,
        conversationId: conversation._id,
        participants: conversation.participants,
      });

      conversation.messages.push({ author: sender, message });

      await conversation.save();

      return res.status(200).send();
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json(getErrorMessage(error));
    }
  },
};

export default conversationController;
