import { CategorySubcategory } from './../../pages/admin/CategoryPage/Type/Type';
import { Category } from '../../pages/admin/CategoryPage/Type/Type';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategory_Subcategory } from './categoryThunk';
import { RootState } from '../../app/store/store';

interface CategoryState {
  categories: Category[];
  categorySubcategory: CategorySubcategory[];
  categoriesLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  categorySubcategory: [],
  categoriesLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload: categories }) => {
        state.categoriesLoading = false;
        state.categories = categories;
      },
    );
    builder.addCase(getCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });
    builder.addCase(getCategory_Subcategory.pending, (state) => {
      state.categoriesLoading = false;
    });
    builder.addCase(getCategory_Subcategory.fulfilled, (state, { payload }) => {
      state.categorySubcategory = payload;
      state.categoriesLoading = false;
    });
    builder.addCase(getCategory_Subcategory.rejected, (state) => {
      state.categoriesLoading = false;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.category.categoriesLoading;
export const selectCategorySubcategory = (state: RootState) =>
  state.categorySubcategory.categorySubcategory;
