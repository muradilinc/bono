import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Floor } from '../model/floors';
import { FormFloor } from '../../../shared/types/Type';

export const initFloor = createAsyncThunk<void, FormFloor>(
  'tables/create',
  async ({ floor }) => {
    await axiosApi.post('/table/create/table/', {
      floor: parseInt(floor),
    });
  },
);

export const getFloors = createAsyncThunk<Floor[]>(
  'floors/getAll',
  async () => {
    const response = await axiosApi.get<Floor[]>('/floors/list/floor/');
    return response.data;
  },
);
