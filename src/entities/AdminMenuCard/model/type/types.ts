export interface DataMenuCard {
  id: number;
  category: string;
  img: string;
  title: string;
  text: string;
  price: number;
  onDelete: (id: number) => void;
}
