import { defineStore } from "pinia";
import type IChatMessage from "@/models/IChatMessage";
import axios from "@/api/axios";
import { socket } from "@/api/socket";

interface IDrawerState {
  isOpen: boolean;
  globalMessages: IChatMessage[];
}

const useDrawerStore = defineStore("drawer", {
  state: () =>
    ({
      isOpen: false,
      globalMessages: [],
    } as IDrawerState),

  actions: {
    toggleDrawer() {
      this.isOpen = !this.isOpen;
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
    },
  },
});

export default useDrawerStore;
