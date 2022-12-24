import useAuthStore from "@/stores/AuthStore";
import { defineStore } from "pinia";
import type IChatMessage from "@/models/IChatMessage";
import axios from "@/api/axios";
import { socket } from "@/api/socket";
import type IConversation from "@/models/IConversation";
import type IPrivateChatMessage from "@/models/websocket/IPrivateChatMessage";
import type IActiveConversation from "@/models/IActiveConversation";

interface IDrawerState {
  isOpen: boolean;
  globalMessages: IChatMessage[];
  conversations: IConversation[];
  activeConversations: IActiveConversation[];
}

const useDrawerStore = defineStore("drawer", {
  state: (): IDrawerState => ({
    isOpen: false,
    globalMessages: [],
    conversations: [],
    activeConversations: [],
  }),

  actions: {
    toggleDrawer() {
      this.isOpen = !this.isOpen;
    },

    getConversation(participants: string[]) {
      return this.conversations.find((conversation) =>
        conversation.participants.every((participant) =>
          participants.includes(participant)
        )
      );
    },

    addActiveConversation(conversation: IActiveConversation) {
      if (this.activeConversations.length >= 3) {
        this.activeConversations.shift();
      }

      this.activeConversations = [...this.activeConversations, conversation];

      console.log("ACTIVE CONVERSATIONS: ", this.activeConversations);
    },

    getActiveConversation(participants: string[]) {
      return this.activeConversations.find((conversation) =>
        conversation.participants.every((participant) =>
          participants.includes(participant)
        )
      );
    },

    closeActiveConversation(participants: string[]) {
      this.activeConversations = this.activeConversations.filter(
        (conversation) =>
          !conversation.participants.every((participant) =>
            participants.includes(participant)
          )
      );
    },

    async initialize() {
      try {
        const response = await axios.get("/global-chat");

        this.globalMessages = response.data.messages;

        socket.on("global_message", (message: IChatMessage) => {
          this.globalMessages.push({
            author: message.author,
            message: message.message,
          });
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get("/conversations");

        this.conversations = response.data.conversations;

        const auth = useAuthStore();

        socket.on(
          `private_message_${auth.username}`,
          (message: IPrivateChatMessage) => {
            let conversation = this.conversations.find(
              (conversation) => conversation._id === message.conversationId
            );

            if (conversation) {
              this.conversations = this.conversations.filter(
                (conversation) => conversation._id !== message.conversationId
              );

              this.conversations = [conversation, ...this.conversations];
            } else {
              conversation = {
                _id: message.conversationId,
                participants: message.participants,
                messages: [
                  { message: message.message, author: message.author },
                ],
              };
              this.conversations = [conversation, ...this.conversations];
            }

            const activeConversation = this.getActiveConversation(
              message.participants
            );

            console.log(activeConversation?.messages, message.participants);

            if (!activeConversation) {
              this.addActiveConversation(conversation);

              const newActiveConversation = this.getActiveConversation(
                message.participants
              );

              newActiveConversation?.messages.push({
                message: message.message,
                author: message.author,
              });
            } else {
              activeConversation.messages.push({
                message: message.message,
                author: message.author,
              });
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default useDrawerStore;
