import { createSlice } from '@reduxjs/toolkit';
import { getSchedules } from '../api/scheduleThunk';
import { RootState } from '../../../app/store/store';

export interface Schedule {
  id: number;
  time_stamp: string;
  start_time: string;
  end_time: string;
  table: number;
}

interface ScheduleState {
  schedules: Schedule[];
  schedulesLoading: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  schedulesLoading: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const scheduleReducer = scheduleSlice.reducer;
export const selectSchedules = (state: RootState) => state.schedule.schedules;
export const selectSchedulesLoading = (state: RootState) =>
  state.schedule.schedulesLoading;
