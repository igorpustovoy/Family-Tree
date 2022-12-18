interface IPrivateChatMessage {
  conversationId: string;
  author: string;
  message: string;
  participants: string[];
}

export default IPrivateChatMessage;
