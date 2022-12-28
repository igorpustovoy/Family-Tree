import type IAncestor from "@/models/IAncestor";
import type ITreeViewObject from "@/models/ITreeViewObject";

const useViewTree = (tree: IAncestor[]): ITreeViewObject[] => {
  const mapObjects = (objects: IAncestor[]): ITreeViewObject[] => {
    const childrenList: ITreeViewObject[] = [];
    for (const object of objects) {
      if (object.children.length) {
        const children = object.children.map((child) => {
          return tree.find((person) => person.id === child);
        });

        if (!children.length) return [];

        if (object.spouseId) {
          const spouse = tree.find((person) => person.id === object.spouseId);

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
          const spouse = tree.find((person) => person.id === object.spouseId);

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

  const root = tree.find((person) => person.isRoot);

  if (!root) return [];

  const mappedObjects = mapObjects([root]);

  return mappedObjects;
};

export default useViewTree;
