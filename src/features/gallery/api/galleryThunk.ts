//Get
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';

export const getGallery = createAsyncThunk('gallery/getAll', async () => {
  const res = await axiosApi.get(`/gallery/galleries/`);
  return res.data;
});
