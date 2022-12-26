import axios from "@/api/axios";
import { defineStore } from "pinia";
import type IAncestor from "@/models/IAncestor";
import type ITreeViewObject from "@/models/ITreeViewObject";

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
        const response = await axios.get("/family-tree");

        console.log("FAMILY TREE FROM API: ", response.data);

        this.familyTree = [...this.familyTree, ...response.data.people];
      } catch (error) {
        console.log(error);
      }
    },

    addChild(parentId: string, person: IAncestor) {
      const parent = this.familyTree.find((person) => person.id === parentId);

      if (!parent) return;

      parent.children.push(person.id);
      this.familyTree.push(person);
    },
  },

  getters: {
    getNameList(): string[] {
      return this.familyTree.map((person) => person.name);
    },

    getViewableTreeStructure(): ITreeViewObject[] {
      const mapObjects = (objects: IAncestor[]): ITreeViewObject[] => {
        const childrenList: ITreeViewObject[] = [];
        for (const object of objects) {
          console.log("OBJECT: ", object, "ALL OBJECTS: ", objects);

          if (object.children.length) {
            const children = object.children.map((child) => {
              return this.familyTree.find((person) => person.id === child);
            });

            if (!children.length) return [];

            childrenList.push({
              firstPerson: {
                name: object.name,
                image: `https://fakeface.rest/face/view/${object.id}`,
                id: object.id,
              },
              children: [...mapObjects(children as IAncestor[])],
            });
          } else {
            childrenList.push({
              firstPerson: {
                name: object.name,
                image: `https://fakeface.rest/face/view/${object.id}`,
                id: object.id,
              },
            });
          }
        }

        return childrenList;
      };

      const root = this.familyTree.find((person) => person.isRoot);

      if (!root) return [];

      const mappedObjects = mapObjects([root]);

      console.log("MAPPED OBJECTS: ", mappedObjects);

      return mappedObjects;
    },
  },
});

export default useFamilyTreeStore;
