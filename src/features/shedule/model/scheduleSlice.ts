import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createBook,
  deleteBook,
  getSchedules,
  getSchedulesCommon,
  getSchedulesIncoming,
  getSingleBook,
  updateBook,
} from '../api/scheduleThunk';
import { RootState } from '../../../app/store/store';
import { FormComeMutation } from '../../../shared/types/Type';

export interface Schedule {
  id: number;
  user_name: string;
  phone_number: string;
  time_stamp: string;
  start_time: string;
  end_time: string;
  table: number;
  is_come: boolean;
  comment: string;
  amount_guest: number;
  will_come: string;
  table_set: {
    id: number | null;
    number_table: number | null;
  };
}

interface ScheduleState {
  schedules: Schedule[];
  schedulesIncoming: Schedule[];
  schedulesCommon: Schedule[];
  book: FormComeMutation | null;
  bookLoading: boolean;
  schedulesLoading: boolean;
  schedulesIncomingLoading: boolean;
  schedulesCommonLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  schedulesIncoming: [],
  schedulesCommon: [],
  book: null,
  bookLoading: false,
  schedulesLoading: false,
  schedulesIncomingLoading: false,
  schedulesCommonLoading: false,
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
    builder.addCase(getSchedulesIncoming.pending, (state) => {
      state.schedulesIncomingLoading = true;
    });
    builder.addCase(
      getSchedulesIncoming.fulfilled,
      (state, { payload: schedulesIncoming }) => {
        state.schedulesIncomingLoading = false;
        state.schedulesIncoming = schedulesIncoming;
      },
    );
    builder.addCase(getSchedulesIncoming.rejected, (state) => {
      state.schedulesCommonLoading = false;
    });

    builder.addCase(getSchedulesCommon.pending, (state) => {
      state.schedulesCommonLoading = true;
    });
    builder.addCase(
      getSchedulesCommon.fulfilled,
      (state, { payload: schedulesCommon }) => {
        state.schedulesCommonLoading = false;
        state.schedulesCommon = schedulesCommon;
      },
    );
    builder.addCase(getSchedulesCommon.rejected, (state) => {
      state.schedulesIncomingLoading = false;
    });

    builder.addCase(getSingleBook.pending, (state) => {
      state.bookLoading = false;
    });
    builder.addCase(
      getSingleBook.fulfilled,
      (state, { payload: book }: PayloadAction<FormComeMutation>) => {
        state.bookLoading = false;
        state.book = book;
      },
    );
    builder.addCase(getSingleBook.rejected, (state) => {
      state.bookLoading = false;
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
export const selectSchedulesIncoming = (state: RootState) =>
  state.schedule.schedulesIncoming;
export const selectSchedulesCommon = (state: RootState) =>
  state.schedule.schedulesCommon;
export const selectBook = (state: RootState) => state.schedule.book;
export const selectBookLoading = (state: RootState) =>
  state.schedule.bookLoading;
export const selectSchedulesIncomingLoading = (state: RootState) =>
  state.schedule.schedulesIncomingLoading;
export const selectSchedulesCommonLoading = (state: RootState) =>
  state.schedule.schedulesCommonLoading;
export const selectCreateBookLoading = (state: RootState) =>
  state.schedule.createLoading;
export const selectSchedulesLoading = (state: RootState) =>
  state.schedule.schedulesLoading;
export const selectUpdateBookLoading = (state: RootState) =>
  state.schedule.updateLoading;
export const selectDeleteBookLoading = (state: RootState) =>
  state.schedule.deleteLoading;
