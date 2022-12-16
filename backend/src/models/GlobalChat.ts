import { Schema, model } from "mongoose";
import IMessage from "./IMessage";

export interface IGlobalChat {
  messages: IMessage[];
}

const globalChatSchema = new Schema<IGlobalChat>(
  {
    messages: [
      {
        author: String,
        message: String,
      },
    ],
  },
  { collection: "global-chat" }
);

const GlobalChat = model<IGlobalChat>("GlobalChat", globalChatSchema);

export default GlobalChat;
