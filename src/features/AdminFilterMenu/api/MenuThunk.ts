import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuType } from '../model/types/type';
import axiosApi from '../../../app/axiosApi';

export const getMenu = createAsyncThunk<MenuType, number>(
  'get-menu',
  async (id) => {
    const response = await axiosApi.get<MenuType>(
      `menu/get_update_or_delete/${id}/`,
    );
    return response.data;
  },
);
