import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryItemType } from '../model/types/type';
import axiosApi from '../../../app/axiosApi';

export const getCategory = createAsyncThunk<CategoryItemType[]>(
  'get-category',
  async () => {
    const response = await axiosApi.get<CategoryItemType[]>(
      `/category/list_or_create/`,
    );
    return response.data;
  },
);
