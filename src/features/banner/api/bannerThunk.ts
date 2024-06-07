import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Banners } from '../model/types';

//Get:
export const getBanners = createAsyncThunk<Banners[]>(
  'banner/getAll',
  async () => {
    const response = await axiosApi.get<Banners[]>('/banner/list/banner/');
    return response.data;
  },
);

export const getBannersId = createAsyncThunk<Banners[]>(
  'banner/getOne',
  async (id) => {
    const response = await axiosApi.get<Banners[]>(`/banner/list/banner/${id}`);
    return response.data;
  },
);

export const getBannersTopik = createAsyncThunk<Banners[]>(
  'bannerTopik/getAll',
  async () => {
    const response = await axiosApi.get<Banners[]>(
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
