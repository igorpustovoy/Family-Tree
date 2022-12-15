import axios from "@/api/axios";
import type IAuth from "@/models/IAuth";
import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "",
    email: "",
  }),

  actions: {
    setAuth(username: string, email: string) {
      this.username = username;
      this.email = email;
    },

    clearAuth() {
      this.username = "";
      this.email = "";
    },

    async authenticate() {
      try {
        const response = await axios.get<IAuth>("/users/authenticate");

        this.setAuth(response.data.username, response.data.email);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    isAuthenticated() {
      if (this.username === "" || this.email === "") {
        return false;
      }
      return true;
    },
  },
});

export default useAuthStore;
