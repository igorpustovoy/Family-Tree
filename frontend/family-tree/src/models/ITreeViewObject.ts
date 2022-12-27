interface ITreeViewObject {
  firstPerson: {
    name: string;
    image: string;
    id: string;
  };
  secondPerson?: {
    name: string;
    image: string;
    id: string;
  };
  children?: ITreeViewObject[];
}

export default ITreeViewObject;
