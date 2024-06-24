export interface DataFilterCard {
  title: string;
}

export interface DataMenuCard {
  id: number;
  category: string;
  img: string;
  title: string;
  text: string;
  gram: number;
  price: number;
}

export interface MenuType {
  id: number;
  created_at: string;
  title: string;
  price: number;
  image: string;
  description: string | null;
  category: number;
  subcategory: number;
}

export interface SubcategoryType {
  id: number;
  name: string;
}

export interface MenuItemMutation {
  title: string;
  price: number;
  description: string;
  image: File | null;
  subcategory: number;
  category: number;
}
