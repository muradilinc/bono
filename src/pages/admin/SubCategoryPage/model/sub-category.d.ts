export interface SubCategory {
  id: number;
  name: '';
  parent: number;
}

export interface SubCategoryMutation {
  name: '';
  parent: number | null;
}
