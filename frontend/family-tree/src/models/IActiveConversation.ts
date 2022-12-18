import type IChatMessage from "./IChatMessage";

interface IActiveConversation {
  id?: string;
  participants: string[];
  messages: IChatMessage[];
}

export default IActiveConversation;
