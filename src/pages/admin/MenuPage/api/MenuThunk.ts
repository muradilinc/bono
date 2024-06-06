import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { MenuItemMutation } from '../model/types';

export const createMenu = createAsyncThunk(
  'create-menu',
  async (menuItem: MenuItemMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', menuItem.title);
      //   formData.append('price', menuItem.price);
      //   formData.append('gram', menuItem.gram);
      if (menuItem.image) {
        formData.append('image', menuItem.image);
      }
      formData.append('description', menuItem.description);
      formData.append('category_id', menuItem.category_id);
      const response = await axiosApi.post(
        '/swagger/menu/list_or_create/',
        formData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
