import { createSlice } from '@reduxjs/toolkit';
import { getSubcategory } from '../api/SubcategoryThunk';
import { SubcategoryType } from './types/type';
import { RootState } from '../../../app/store/store';

interface SubcategoryState {
  subcategories: SubcategoryType[];
  subcategoriesLoading: boolean;
}

const initialState: SubcategoryState = {
  subcategories: [],
  subcategoriesLoading: false,
};

export const subcategory = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubcategory.pending, (state) => {
        state.subcategoriesLoading = true;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategories = action.payload;
      })
      .addCase(getSubcategory.rejected, (state) => {
        state.subcategoriesLoading = false;
      });
  },
});

export const subcategoryReducer = subcategory.reducer;
export const selectSubcategory = (state: RootState) =>
  state.subcategory.subcategories;
export const selectSubcategoryLoading = (state: RootState) =>
  state.subcategory.subcategoriesLoading;
