import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubcategoryType } from '../model/types/type';
import axiosApi from '../../../app/axiosApi';

export const getSubcategory = createAsyncThunk<SubcategoryType[], number>(
  'get-subcategory',
  async (id) => {
    const response = await axiosApi.get<SubcategoryType[]>(
      `/category/subcategory_list/?category_id=${id}`,
    );
    return response.data;
  },
);
