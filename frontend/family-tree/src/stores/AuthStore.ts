import axios from "@/api/axios";
import type IAuth from "@/models/IAuth";
import { defineStore } from "pinia";
import useDrawerStore from "./DrawerStore";
import useFamilyTreeStore from "./FamilyTreeStore";

interface IAuthState {
  username: string;
  email: string;
  hasRequestedAuth: boolean;
}

const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      username: "",
      email: "",
      hasRequestedAuth: false,
    } as IAuthState),

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
      } finally {
        this.hasRequestedAuth = true;
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
