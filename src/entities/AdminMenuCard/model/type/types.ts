export interface DataMenuCard {
  id: number;
  category: string;
  img: string;
  title: string;
  text: string;
  gram: number;
  price: number;
  onDelete: (id: number) => void;
}
