import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import {
  Category,
  CategoryMutation,
  CategorySubcategory,
} from '../../pages/admin/CategoryPage/Type/Type';

export const createCategory = createAsyncThunk<void, CategoryMutation>(
  'category/createCategory',
  async (category) => {
    const formData = new FormData();
    formData.append('name', category.name);
    if (category.image) {
      formData.append('image', category.image);
    }
    await axiosApi.post(`/category/list_or_create/`, formData);
  },
);

export const getCategories = createAsyncThunk<Category[]>(
  'category/getAll',
  async () => {
    const response = await axiosApi.get<Category[]>(
      '/category/list_or_create/',
    );
    return response.data;
  },
);

interface UpdateCategory {
  id: number;
  category: { name?: string; image?: File | null };
}

export const changeCategory = createAsyncThunk<void, UpdateCategory>(
  'category/updateCategory',
  async ({ id, category }) => {
    const formData = new FormData();
    if (category.name) {
      formData.append('name', category.name);
    }
    if (category.image) {
      formData.append('image', category.image);
    }
    await axiosApi.put(`/category/${id}/`, formData);
  },
);

export const deleteCategory = createAsyncThunk<void, number>(
  'category/deleteCategory',
  async (id) => {
    await axiosApi.delete(`/category/${id}/`);
  },
);

export const getCategory_Subcategory = createAsyncThunk<CategorySubcategory[]>(
  'category_subcategory/getAll',
  async () => {
    const response = await axiosApi.get<CategorySubcategory[]>(
      '/category/category_subcategory_list/',
    );
    return response.data;
  },
);
