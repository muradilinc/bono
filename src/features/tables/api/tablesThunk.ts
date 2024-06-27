import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';

export const getTables = createAsyncThunk('tables/getAll', async () => {
  const response = await axiosApi.get('');
  return response.data;
});
