import axios from "@/api/axios";
import { defineStore } from "pinia";

interface IFamilyTreeState {
  familyTree: [];
}

const useFamilyTreeStore = defineStore("family-tree", {
  state: () =>
    ({
      familyTree: [],
    } as IFamilyTreeState),

  actions: {
    async getFamilyTree() {
      try {
        const response = await axios.get("/family-tree");
        this.familyTree = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default useFamilyTreeStore;
