import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { FormTable } from '../../../shared/types/Type';
import axios from 'axios';
import { TableAll, TableUpdateProps } from '../model/table';

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

export const getTables = createAsyncThunk<TableAll[], number | undefined>(
  'tables/getAll',
  async (floor) => {
    const response = await axiosApi.get<TableAll[]>(
      `/table/list/table${floor ? `?floor=${floor}` : ''}`,
    );
    return response.data;
  },
);
export const getTablesAll = createAsyncThunk<TableAll[], number | undefined>(
  'tables/getAlls',
  async () => {
    const response = await axiosApi.get<TableAll[]>(`/table/list/table`);
    return response.data;
  },
);

export const deleteTables = createAsyncThunk<void, number>(
  'tables/delete',
  async (id) => {
    const response = await axiosApi.delete(`/table/delete/table/${id}/`);
    return await response.data;
  },
);

export const updateTables = createAsyncThunk<
  void,
  { id: number; data: TableUpdateProps }
>('tables/update', async ({ id, data }) => {
  const response = await axiosApi.put(`/table/update/table/${id}/`, data);
  return await response.data;
});
