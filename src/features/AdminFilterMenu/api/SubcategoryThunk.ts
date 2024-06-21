import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';

export const getSubcategory = createAsyncThunk(
  'subcategory/getById',
  async (id: number) => {
    const response = await axiosApi.get(
      `/category/subcategory_list/?category_id=${id}`,
    );
    return response.data;
  },
);
