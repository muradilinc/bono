export interface ICategory {
  url: string;
  date: string;
  size: string;
  name: string | null;
}
export interface ICategory2 {
  image: string;
  created_at: string;
  name: string;
  id: number;
}

export interface ICategoryProp {
  setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ICategoryPropCard {
  el: ICategory2;
  // category: ICategory2[];
  // setCategory: React.Dispatch<React.SetStateAction<ICategory2[]>>;
  inx: number;
  handleDelete: (id: number) => void;
}
