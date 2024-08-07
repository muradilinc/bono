import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTables } from '../api/tablesThunk';
import { RootState } from '../../../app/store/store';
import { TableAll } from './table';

interface TableState {
  tables: TableAll[];
  tablesLoading: boolean;
}

const initialState: TableState = {
  tables: [],
  tablesLoading: false,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTables.pending, (state) => {
      state.tablesLoading = true;
    });
    builder.addCase(
      getTables.fulfilled,
      (state, { payload: tables }: PayloadAction<TableAll[]>) => {
        state.tablesLoading = false;
        state.tables = tables;
      },
    );
    builder.addCase(getTables.rejected, (state) => {
      state.tablesLoading = false;
    });
  },
});

export const tableReducer = tableSlice.reducer;
export const selectTables = (state: RootState) => state.table.tables;
export const selectTablesLoading = (state: RootState) =>
  state.table.tablesLoading;
