export interface MenuItemMutation {
  title: string;
  price: string | number;
  gram: string | number;
  image: File | null;
  description: string;
  category_id: string;
}
