import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuType, MenuTypeThunk, MenuUpdateType } from '../model/types/type';
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
  async (menuData: MenuTypeThunk) => {
    const formData = new FormData();
    formData.append('title', menuData.title);
    formData.append('price', menuData.price.toString());
    formData.append('description', menuData.description);
    formData.append('category', menuData.category.toString());
    formData.append('subcategory', menuData.subcategory.toString());
    if (menuData.image) {
      formData.append('image', menuData.image);
    }
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
export const getMenuByCategory = createAsyncThunk(
  'menu/getById',
  async ({ categoryId }: { categoryId: number }) => {
    const response = await axiosApi.get<MenuType[]>(
      `category/subcategory_list/?category_${categoryId}`,
    );
    return response.data;
  },
);

export const updateMenu = createAsyncThunk(
  'menu/update',
  async ({ id, data }: { id: number; data: MenuUpdateType }) => {
    const response = await axiosApi.put(
      `/menu/get_update_or_delete/${id}/`,
      data,
    );
    return response.data;
  },
);
