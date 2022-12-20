import type IChatMessage from "./IChatMessage";

interface IActiveConversation {
  _id?: string;
  participants: string[];
  messages: IChatMessage[];
}

export default IActiveConversation;
