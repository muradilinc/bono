export interface DataMenuCard {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string | null;
  onDelete: (id: number) => void;
}