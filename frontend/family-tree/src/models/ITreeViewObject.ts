interface ITreeViewObject {
  firstPerson: {
    name: string;
    image: string;
  };
  children?: ITreeViewObject[];
}

export default ITreeViewObject;
