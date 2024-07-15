import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { FormTable } from '../../../shared/types/Type';
import axios from 'axios';

export const initTable = createAsyncThunk<void, FormTable>(
  'tables/create',
  async ({ table, floor }, { rejectWithValue }) => {
    try {
      await axiosApi.post('/table/create/table/', {
        number_table: parseInt(table),
        floor: parseInt(floor),
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      } else {
        throw error;
      }
    }
  },
);

export const getTables = createAsyncThunk<Table[], number | undefined>(
  'tables/getAll',
  async (floor) => {
    const response = await axiosApi.get<Table[]>(
      `/table/list/table${floor ? `?floor=${floor}` : ''}`,
    );
    return response.data;
  },
);
