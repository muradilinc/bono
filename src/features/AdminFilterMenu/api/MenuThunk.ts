import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuType } from '../model/types/type';
import axiosApi from '../../../app/axiosApi';

export const getMenu = createAsyncThunk<MenuType[]>('menu/getAll', async () => {
  const response = await axiosApi.get<MenuType[]>(`/menu/list_or_create/`);
  return response.data;
});

export const deleteMenu = createAsyncThunk(
  'menu/delete',
  async (id: number) => {
    const response = await axiosApi.delete(`/menu/get_update_or_delete/${id}`);
    return response.data;
  },
);

export const createMenu = createAsyncThunk(
  'menu/create',
  async (formData: FormData) => {
    try {
      const response = await axiosApi.post<MenuType>(
        `/menu/list_or_create/`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getMenuByCategoryAndSubcategory = createAsyncThunk(
  'menu/getById',
  async ({
    categoryId,
    subcategoryId,
  }: {
    categoryId: number;
    subcategoryId: number;
  }) => {
    const response = await axiosApi.get<MenuType[]>(
      `menu/menu_list_by_category_subcategory/?category=${categoryId}&subcategory=${subcategoryId}`,
    );
    return response.data;
  },
);
