import { createSlice } from '@reduxjs/toolkit';
import {
  createBook,
  deleteBook,
  getSchedules,
  updateBook,
} from '../api/scheduleThunk';
import { RootState } from '../../../app/store/store';

export interface Schedule {
  id: number;
  time_stamp: string;
  start_time: string;
  end_time: string;
  table: number;
  is_come: boolean;
}

interface ScheduleState {
  schedules: Schedule[];
  schedulesLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  schedulesLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBook.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createBook.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createBook.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(getSchedules.pending, (state) => {
      state.schedulesLoading = true;
    });
    builder.addCase(getSchedules.fulfilled, (state, { payload: schedules }) => {
      state.schedulesLoading = false;
      state.schedules = schedules;
    });
    builder.addCase(getSchedules.rejected, (state) => {
      state.schedulesLoading = false;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteBook.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const scheduleReducer = scheduleSlice.reducer;
export const selectSchedules = (state: RootState) => state.schedule.schedules;
export const selectCreateBookLoading = (state: RootState) =>
  state.schedule.createLoading;
export const selectSchedulesLoading = (state: RootState) =>
  state.schedule.schedulesLoading;
export const selectUpdateBookLoading = (state: RootState) =>
  state.schedule.updateLoading;
export const selectDeleteBookLoading = (state: RootState) =>
  state.schedule.deleteLoading;
