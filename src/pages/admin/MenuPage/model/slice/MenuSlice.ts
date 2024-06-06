import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemMutation } from './../types.d';
import { createMenu } from '../../api/MenuThunk';

interface MenuState {
  items: MenuItemMutation[];
  loading: boolean;
  error: null;
};

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createMenu.fulfilled,
        (state, action: PayloadAction<MenuItemMutation>) => {
          state.loading = false;
          state.items.push(action.payload);
        },
      )
      .addCase(createMenu.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
