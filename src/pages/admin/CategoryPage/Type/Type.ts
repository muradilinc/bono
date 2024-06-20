export interface CategoryMutation {
  name: string;
  image: File | null;
}

export interface Category {
  image: string;
  created_at: string;
  name: string;
  id: number;
}

export interface ICategoryProp {
  setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>;
}
