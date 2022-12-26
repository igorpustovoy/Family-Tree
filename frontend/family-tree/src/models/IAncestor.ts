interface IAncestor {
  id: string;
  name: string;
  isRoot: boolean;
  treeOwner: string;
  children: string[];
  spouseId?: string;
}

export default IAncestor;
