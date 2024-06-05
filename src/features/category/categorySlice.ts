import { Category } from '../../pages/admin/CategoryPage/Type/Type';
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoryThunk';
import { RootState } from '../../app/store/store';

interface CategoryState {
  categories: Category[];
  categoriesLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
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
  },
});

export const categoryReducer = categorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.category.categoriesLoading;
