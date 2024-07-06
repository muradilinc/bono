import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { SubCategory, SubCategoryMutation } from '../model/sub-category';

export const createSubCategory = createAsyncThunk<void, SubCategoryMutation>(
  'subCategory/create',
  async (subCategory) => {
    await axiosApi.post('/category/subcategories/', subCategory);
  },
);

export const getSubCategories = createAsyncThunk<SubCategory[]>(
  'subCategory/getAll',
  async () => {
    const response = await axiosApi.get<SubCategory[]>(
      '/category/subcategories/',
    );
    return response.data;
  },
);

export const getSingleSubCategory = createAsyncThunk<SubCategory, string>(
  'subcategory/getSingle',
  async (id) => {
    const response = await axiosApi.get(`/category/subcategories/${id}/`);
    return response.data;
  },
);

export const getFilterSubcategories = createAsyncThunk(
  'subcategory/getById',
  async (id: number) => {
    const response = await axiosApi.get(
      `/category/subcategory_list/?category_id=${id}`,
    );
    return response.data;
  },
);

interface UpdateSubCategory {
  subCategory: SubCategoryMutation;
  id: string;
}

export const updateSubCategory = createAsyncThunk<void, UpdateSubCategory>(
  'subcategory/update',
  async ({ id, subCategory }) => {
    await axiosApi.put(`/category/subcategories/${id}/`, {
      ...subCategory,
    });
  },
);

export const deleteSubCategory = createAsyncThunk<void, number>(
  'subCategory/delete',
  async (id) => {
    await axiosApi.delete(`/category/subcategories/${id}/`);
  },
);
