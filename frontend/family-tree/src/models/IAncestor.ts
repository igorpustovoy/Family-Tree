interface IAncestor {
  id: string;
  name: string;
  isRoot: boolean;
  treeOwner: string;
  children: string[];
}

export default IAncestor;
