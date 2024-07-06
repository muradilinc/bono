import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Floor } from '../model/floors';
import { FormFloor } from '../../../shared/types/Type';

export const initFloor = createAsyncThunk<void, FormFloor>(
  'tables/create',
  async ({ title }) => {
    await axiosApi.post('/floors/create/floor/', { title });
  },
);

export const getFloors = createAsyncThunk<Floor[]>(
  'floors/getAll',
  async () => {
    const response = await axiosApi.get<Floor[]>('/floors/list/floor/');
    return response.data;
  },
);

export const getSingleFloor = createAsyncThunk<Floor, string>(
  'floors/getSingle',
  async (id) => {
    const response = await axiosApi.get(`/floors/detail/floor/${id}/`);
    return response.data;
  },
);

export const updateFloor = createAsyncThunk<void, Floor>(
  'floors/update',
  async ({ title, id }) => {
    await axiosApi.put(`/floors/update/floor/${id}/`, { title });
  },
);

export const deleteFloor = createAsyncThunk<void, number>(
  'floors/delete',
  async (id) => {
    await axiosApi.delete(`/floors/delete/floor/${id}/`);
  },
);
