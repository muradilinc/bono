export interface SubCategory {
  id: number;
  name: '';
  parent_details: {
    id: number;
    name: string;
  };
}

export interface SubCategoryMutation {
  name: '';
  parent_details: {
    id: number;
    name: string;
  } | null;
}
