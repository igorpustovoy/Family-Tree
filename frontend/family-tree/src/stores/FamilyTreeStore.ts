import axios from "@/api/axios";
import { defineStore } from "pinia";

interface IFamilyTreeState {
  familyTree: any[];
}

const useFamilyTreeStore = defineStore("family-tree", {
  state: () =>
    ({
      familyTree: [],
    } as IFamilyTreeState),

  actions: {
    async fetchFamilyTree() {
      try {
        const response = await axios.get("/family-tree");

        console.log("FAMILY TREE FROM API: ", response.data);

        this.familyTree = [...this.familyTree, ...response.data.people];
      } catch (error) {
        console.log(error);
      }
    },

    addFirstPerson(person: { name: string }) {
      this.familyTree = [...this.familyTree, person];
    },

    addPerson(person: { name: string }) {
      this.familyTree = [...this.familyTree, person];
    },

    getNameList() {
      return this.familyTree.map((person) => person.name);
    },
  },
});

export default useFamilyTreeStore;
