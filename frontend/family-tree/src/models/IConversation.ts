import type IChatMessage from "./IChatMessage";

interface IConversation {
  _id: string;
  participants: string[];
  messages: IChatMessage[];
}

export default IConversation;
