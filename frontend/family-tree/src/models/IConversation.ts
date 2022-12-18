import type IChatMessage from "./IChatMessage";

interface IConversation {
  id: string;
  participants: string[];
  messages: IChatMessage[];
}

export default IConversation;
