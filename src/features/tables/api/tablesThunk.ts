import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { FormTable } from '../../../shared/types/Type';

export const initTable = createAsyncThunk<void, FormTable>(
  'tables/create',
  async ({ table, floor }) => {
    await axiosApi.post('/table/create/table/', {
      number_table: parseInt(table),
      floor: parseInt(floor),
    });
  },
);

interface FilterTable {
  date?: string;
  number?: string;
  name?: string;
}

export const getFilterTable = createAsyncThunk<void, FilterTable>(
  'tables/getByFilter',
  async ({ date }) => {
    const response = await axiosApi.get(
      `/table/filters_by_date_status_floor/?date=${date}`,
    );
    return response.data;
  },
);

export const getTables = createAsyncThunk<Table[]>(
  'tables/getAll',
  async () => {
    const response = await axiosApi.get<Table[]>('/table/list/table/');
    return response.data;
  },
);
