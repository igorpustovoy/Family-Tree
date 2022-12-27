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

        this.familyTree = [...this.familyTree, ...response.data.people];
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
    getNameList(): string[] {
      return this.familyTree.map((person) => person.name);
    },

    getViewableTreeStructure(): ITreeViewObject[] {
      const mapObjects = (objects: IAncestor[]): ITreeViewObject[] => {
        const childrenList: ITreeViewObject[] = [];
        for (const object of objects) {
          if (object.children.length) {
            const children = object.children.map((child) => {
              return this.familyTree.find((person) => person.id === child);
            });

            if (!children.length) return [];

            if (object.spouseId) {
              const spouse = this.familyTree.find(
                (person) => person.id === object.spouseId
              );

              if (!spouse) {
                console.error("Spouse not found");
                return [];
              }

              childrenList.push({
                firstPerson: {
                  name: object.name,
                  image: `https://fakeface.rest/face/view/${object.id}`,
                  id: object.id,
                },
                secondPerson: {
                  name: spouse.name,
                  image: `https://fakeface.rest/face/view/${spouse.id}`,
                  id: spouse.id,
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
                children: [...mapObjects(children as IAncestor[])],
              });
            }
          } else {
            if (object.spouseId) {
              const spouse = this.familyTree.find(
                (person) => person.id === object.spouseId
              );

              if (!spouse) {
                console.error("Spouse not found");
                return [];
              }

              childrenList.push({
                firstPerson: {
                  name: object.name,
                  image: `https://fakeface.rest/face/view/${object.id}`,
                  id: object.id,
                },
                secondPerson: {
                  name: spouse.name,
                  image: `https://fakeface.rest/face/view/${spouse.id}`,
                  id: spouse.id,
                },
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
        }

        return childrenList;
      };

      const root = this.familyTree.find((person) => person.isRoot);

      if (!root) return [];

      const mappedObjects = mapObjects([root]);

      return mappedObjects;
    },
  },
});

export default useFamilyTreeStore;
