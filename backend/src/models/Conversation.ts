import { Schema, model } from "mongoose";
import IMessage from "./IMessage";

export interface IConversation {
  participants: string[];
  messages: IMessage[];
}

const conversationSchema = new Schema<IConversation>({
  participants: [String],
  messages: [
    {
      author: String,
      message: String,
    },
  ],
});

const Conversation = model<IConversation>("Conversation", conversationSchema);

export default Conversation;
