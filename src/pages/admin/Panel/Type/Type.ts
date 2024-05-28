export interface ICategory {
  url: string;
  date: string;
  size: string;
  name: string | null;
}

export interface ICategoryProp {
  category: ICategory[];
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface ICategoryProp2 {
  category: ICategory[];
  setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
}
export interface ICategoryProp2Card {
  el: ICategory;
  category: ICategory[];
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  inx: number;
}
