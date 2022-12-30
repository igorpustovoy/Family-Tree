import axios from "@/api/axios";
import { defineStore } from "pinia";
import type IAncestor from "@/models/IAncestor";
import type ITreeViewObject from "@/models/ITreeViewObject";
import useAuthStore from "./AuthStore";

interface IFamilyTreeState {
  familyTree: IAncestor[];
}

const useFamilyTreeStore = defineStore("family-tree", {
  state: (): IFamilyTreeState => ({
    familyTree: [],
  }),

  actions: {
    async fetchFamilyTree() {
      try {
        const auth = useAuthStore();

        const response = await axios.get(`/family-tree/${auth.username}`);

        this.familyTree = [...response.data.people];

        console.log("TREE FROM API: ", this.familyTree);
      } catch (error) {
        console.log(error);
      }
    },

    addPerson(person: IAncestor) {
      this.familyTree = [...this.familyTree, person];
    },

    addSpouse(personId: string, spouse: IAncestor) {
      const person = this.familyTree.find((person) => person.id === personId);

      if (!person) return;

      person.spouseId = spouse.id;
      this.familyTree = [...this.familyTree, spouse];
    },

    addChild(parentId: string, person: IAncestor) {
      const parent = this.familyTree.find((person) => person.id === parentId);

      if (!parent) return;

      if (parent.spouseId) {
        const spouse = this.familyTree.find(
          (person) => person.id === parent.spouseId
        );

        if (!spouse) return;

        spouse.children.push(person.id);
      }

      parent.children.push(person.id);
      this.familyTree.push(person);
    },
  },

  getters: {
    getCorrectCopyPeople(): string[] {
      const names = this.familyTree
        .filter(
          (person) =>
            this.familyTree.some((p) => p.children.includes(person.id)) ||
            person.isRoot
        )
        .map((person) => person.name);

      return names;
    },
  },
});

export default useFamilyTreeStore;
