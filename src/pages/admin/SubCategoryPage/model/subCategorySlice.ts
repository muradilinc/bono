import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSubCategories } from '../api/subCategoryThunk';
import { RootState } from '../../../../app/store/store';
import { SubCategory } from './sub-category';

interface SubCategoryState {
  subCategories: SubCategory[];
  subCategoriesLoading: boolean;
}

const initialState: SubCategoryState = {
  subCategories: [],
  subCategoriesLoading: false,
};

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubCategories.pending, (state) => {
      state.subCategoriesLoading = true;
    });
    builder.addCase(
      getSubCategories.fulfilled,
      (state, { payload: subCategories }: PayloadAction<SubCategory[]>) => {
        state.subCategoriesLoading = false;
        state.subCategories = subCategories;
      },
    );
    builder.addCase(getSubCategories.rejected, (state) => {
      state.subCategoriesLoading = false;
    });
  },
});

export const subCategoryReducer = subCategorySlice.reducer;
export const selectSubCategories = (state: RootState) =>
  state.subCategories.subCategories;
export const selectSubCategoriesLoading = (state: RootState) =>
  state.subCategories.subCategoriesLoading;
