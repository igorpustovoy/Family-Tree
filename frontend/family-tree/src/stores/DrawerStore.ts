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
  state: () =>
    ({
      isOpen: false,
      globalMessages: [],
      conversations: [],
      activeConversations: [],
    } as IDrawerState),

  actions: {
    toggleDrawer() {
      this.isOpen = !this.isOpen;
    },

    addActiveConversation(conversation: IActiveConversation) {
      if (this.activeConversations.length >= 3) {
        this.activeConversations.shift();
      }

      this.activeConversations.push(conversation);
    },

    getActiveConversation(participants: string[]) {
      return this.activeConversations.find((conversation) =>
        conversation.participants.every((participant) =>
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

        console.log("AUTH STORE IN DRAWER STARE:::", auth.username);

        socket.on(
          `private_message_${auth.username}`,
          (message: IPrivateChatMessage) => {
            console.log("MESSAGE: ", message.conversationId);
            let conversation = this.conversations.find(
              (conversation) => conversation.id === message.conversationId
            );

            if (conversation) {
              // Already pushed to active conversation which is a pointer
              //   conversation.messages.push({
              //     message: message.message,
              //     author: message.author,
              //   });
              //   console.log("MESSAGE PUSHED TO CONVERSATION: ", conversation);
            } else {
              conversation = {
                id: message.conversationId,
                participants: message.participants,
                messages: [
                  { message: message.message, author: message.author },
                ],
              };
              this.conversations.push(conversation);
            }

            const activeConversation = this.getActiveConversation(
              message.participants
            );

            if (!activeConversation) {
              this.addActiveConversation(conversation);
            } else {
              activeConversation.messages.push({
                message: message.message,
                author: message.author,
              });
            }

            console.log(this.conversations);
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default useDrawerStore;
