import { createSlice } from '@reduxjs/toolkit';
import { CategoryItemType } from '../types/type';
import { getCategory } from '../../api/CategoryThunk';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [] as CategoryItemType[],
    isLoading: false,
    error: (null as unknown as string) || null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default categorySlice.reducer;