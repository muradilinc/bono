import { createSlice } from '@reduxjs/toolkit';
import { MenuType } from './types/type';
import { getMenu, getMenuByCategoryAndSubcategory } from '../api/MenuThunk';
import { RootState } from '../../../app/store/store';

interface MenuState {
  menu: MenuType[];
  menuLoading: boolean;
}

const initialState: MenuState = {
  menu: [],
  menuLoading: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenu.pending, (state) => {
      state.menuLoading = true;
    });
    builder.addCase(getMenu.fulfilled, (state, action) => {
      state.menuLoading = false;
      state.menu = action.payload;
    });
    builder.addCase(getMenu.rejected, (state) => {
      state.menuLoading = false;
    });
    builder.addCase(getMenuByCategoryAndSubcategory.pending, (state) => {
      state.menuLoading = true;
    });
    builder.addCase(
      getMenuByCategoryAndSubcategory.fulfilled,
      (state, action) => {
        state.menuLoading = false;
        state.menu = action.payload;
      },
    );
    builder.addCase(getMenuByCategoryAndSubcategory.rejected, (state) => {
      state.menuLoading = false;
      state.menu = [];
    });
  },
});

export const menuReducer = menuSlice.reducer;
export const selectMenu = (state: RootState) => state.menu.menu;
export const selectMenuLoading = (state: RootState) => state.menu.menuLoading;
