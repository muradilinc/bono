import { createSlice } from '@reduxjs/toolkit';
import { SubcategoryType } from '../types/type';
import { getSubcategory } from '../../api/SubCategoryThunk';
import { RootState } from '../../../../app/store/store';

const subcategory = createSlice({
  name: 'subcategory',
  initialState: {
    subcategory: [] as SubcategoryType[],
    isLoading: false,
    error: null as unknown as string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategory = action.payload;
      })
      .addCase(getSubcategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const subcategoryReducer = subcategory.reducer;
export const selectSubcategory = (state: RootState) => state.subcategory.subcategory;
