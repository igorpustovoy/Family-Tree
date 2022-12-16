import { defineStore } from "pinia";

const useDrawerStore = defineStore("drawer", {
  state: () => ({
    isOpen: false,
  }),

  actions: {
    toggleDrawer() {
      this.isOpen = !this.isOpen;
    },
  },
});

export default useDrawerStore;
