import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTables, getTablesAll } from '../api/tablesThunk';
import { RootState } from '../../../app/store/store';
import { TableAll } from './table';

interface TableState {
  tables: TableAll[];
  tablesLoading: boolean;
  tablesAll: TableAll[];
  tablesAllLoading: boolean;
}

const initialState: TableState = {
  tables: [],
  tablesLoading: false,
  tablesAll: [],
  tablesAllLoading: false,
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

    builder.addCase(getTablesAll.pending, (state) => {
      state.tablesAllLoading = true;
    });
    builder.addCase(
      getTablesAll.fulfilled,
      (state, { payload: tablesAll }: PayloadAction<TableAll[]>) => {
        state.tablesAllLoading = false;
        state.tablesAll = tablesAll;
      },
    );
    builder.addCase(getTablesAll.rejected, (state) => {
      state.tablesAllLoading = false;
    });
  },
});

export const tableReducer = tableSlice.reducer;
export const selectTables = (state: RootState) => state.table.tables;
export const selectTablesLoading = (state: RootState) =>
  state.table.tablesLoading;

export const selectTablesAll = (state: RootState) => state.table.tablesAll;
export const selectTablesAllLoading = (state: RootState) =>
  state.table.tablesAllLoading;
