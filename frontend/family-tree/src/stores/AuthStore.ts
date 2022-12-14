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
