import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Banners } from '../model/bannerSlice';

export const getBanners = createAsyncThunk<Banners[]>(
  'banner/getAll',
  async () => {
    const response = await axiosApi.get<Banners[]>('/banner/list/banner/');
    return response.data;
  },
);
