import { createSlice } from '@reduxjs/toolkit';
import { MenuType } from '../types/type';
import { getMenu } from '../../api/MenuThunk';
import { RootState } from '../../../../app/store/store';

const menu = createSlice({
  name: 'menu',
  initialState: {
    menu: {} as MenuType,
    isLoading: false,
    error: null as unknown as string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menu = action.payload;
      })
      .addCase(getMenu.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const menuReducer = menu.reducer;
export const selectMenu = (state: RootState) => state.menu.menu;
export const selectMenuLoading = (state: RootState) => state.menu.isLoading;
