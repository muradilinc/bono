export interface SubCategory {
  id: number;
  name: '';
  parent: number;
}

export interface SubCategoryMutation {
  name: '';
  parent_details: {
    id: number;
    name: string;
  } | null;
}
