import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getFilterSubcategories,
  getSingleSubCategory,
  getSubCategories,
} from '../api/subCategoryThunk';
import { RootState } from '../../../../app/store/store';
import { SubCategory } from './sub-category';

export interface SubCategoryState {
  subCategories: SubCategory[];
  subCategory: SubCategory | null;
  subCategoriesLoading: boolean;
  subCategoryLoading: boolean;
}

const initialState: SubCategoryState = {
  subCategories: [],
  subCategory: null,
  subCategoriesLoading: false,
  subCategoryLoading: false,
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
    builder.addCase(getSingleSubCategory.pending, (state) => {
      state.subCategoryLoading = true;
    });
    builder.addCase(
      getSingleSubCategory.fulfilled,
      (state, { payload: subCategory }: PayloadAction<SubCategory>) => {
        state.subCategoryLoading = false;
        state.subCategory = subCategory;
      },
    );
    builder.addCase(getSingleSubCategory.rejected, (state) => {
      state.subCategoryLoading = false;
    });
    builder.addCase(getFilterSubcategories.pending, (state) => {
      state.subCategoriesLoading = true;
    });
    builder.addCase(
      getFilterSubcategories.fulfilled,
      (state, { payload: subCategories }: PayloadAction<SubCategory[]>) => {
        state.subCategoriesLoading = false;
        state.subCategories = subCategories;
      },
    );
    builder.addCase(getFilterSubcategories.rejected, (state) => {
      state.subCategoriesLoading = false;
    });
  },
});

export const subCategoryReducer = subCategorySlice.reducer;
export const selectSubCategories = (state: RootState) =>
  state.subCategories.subCategories;
export const selectSubCategoriesLoading = (state: RootState) =>
  state.subCategories.subCategoriesLoading;
export const selectSubCategory = (state: RootState) =>
  state.subCategories.subCategory;
export const selectSubCategoryLoading = (state: RootState) =>
  state.subCategories.subCategoryLoading;
