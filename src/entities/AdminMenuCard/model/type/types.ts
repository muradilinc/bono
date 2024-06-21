export interface DataMenuCard {
  id: number;
  // created_at: string,
  title: string;
  price: number;
  image: string;
  description: string | null;
  // category: number;
  // subcategory: number;
  onDelete: (id: number) => void;
}
