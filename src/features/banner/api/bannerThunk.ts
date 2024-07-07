import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Banners, BannersTitle, BannersTopik } from '../model/types';

//Get:
export const getBanners = createAsyncThunk<Banners[]>(
  'banner/getAll',
  async () => {
    const response = await axiosApi.get<Banners[]>('/banner/list/banner/');
    return response.data;
  },
);

export const getBannersId = createAsyncThunk<Banners, string>(
  'banner/getOne',
  async (id: string) => {
    const response = await axiosApi.get<Banners>(
      `/banner/detail/banner/${id}/`,
    );
    return response.data;
  },
);

export const getBannersTopik = createAsyncThunk<BannersTopik[]>(
  'bannerTopik/getAll',
  async () => {
    const response = await axiosApi.get<BannersTopik[]>(
      '/banner/list/banner/topik/',
    );
    return response.data;
  },
);

export const getBannersTopikId = createAsyncThunk<Banners[]>(
  'bannerTopik/getOne',
  async (id) => {
    const response = await axiosApi.get<Banners[]>(`/banner/list/banner/${id}`);
    return response.data;
  },
);
//Get:
//COMPLETE:

// Put,Path:
export const updateBannersId = createAsyncThunk<
  BannersTitle,
  { id: string; data: Partial<BannersTitle> }
>('banner/updateOne', async ({ id, data }) => {
  const response = await axiosApi.put<BannersTitle>(
    `/banner/update/banner/${id}/`,
    data,
  );
  return response.data;
});

export const updateBannersTopikId = createAsyncThunk<
  BannersTopik,
  { id: string | null; data: File }
>('bannerTopik/updateOne', async ({ id, data }) => {
  const formData = new FormData();
  formData.append('img', data);
  const response = await axiosApi.patch<BannersTopik>(
    `/banner/update/banner/topik/${id}/`,
    formData,
  );
  return response.data;
});

//Post

export const addBannersTopik = createAsyncThunk<
  BannersTopik[],
  { formData: FormData }
>('addBannerTopik/addTopik', async ({ formData }) => {
  const response = await axiosApi.post<BannersTopik[]>(
    `/banner/create/banner/topik/`,
    formData,
  );
  return response.data;
});

//Delete

export const deleteBannersTopik = createAsyncThunk<
  BannersTopik[],
  { id: string | null }
>('deleteBannerTopik/deleteTopik', async ({ id }) => {
  const response = await axiosApi.delete<BannersTopik[]>(
    `/banner/delete/banner/topik/${id}/`,
  );
  return response.data;
});
