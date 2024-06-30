import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Floor } from '../model/floors';

export const getFloors = createAsyncThunk<Floor[]>(
  'floors/getAll',
  async () => {
    const response = await axiosApi.get<Floor[]>('/floors/list/floor/');
    return response.data;
  },
);
