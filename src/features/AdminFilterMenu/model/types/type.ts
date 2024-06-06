export interface DataFilterCard {
  title: string;
}

export interface DataMenuCard {
  id: number;
  category: string;
  img: string;
  title: string;
  text: string;
  price: number;
}

export interface CategoryItemType {
  id: number,
  name: string,
  parent: string
}