import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFloors } from '../api/floorThunk';
import { RootState } from '../../../app/store/store';
import { Floor } from './floors';

interface FloorState {
  floors: Floor[];
  floorsLoading: boolean;
}

const initialState: FloorState = {
  floors: [],
  floorsLoading: false,
};

const floorSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFloors.pending, (state) => {
      state.floorsLoading = true;
    });
    builder.addCase(
      getFloors.fulfilled,
      (state, { payload: floors }: PayloadAction<Floor[]>) => {
        state.floorsLoading = false;
        state.floors = floors;
      },
    );
    builder.addCase(getFloors.rejected, (state) => {
      state.floorsLoading = false;
    });
  },
});

export const floorsReducer = floorSlice.reducer;
export const selectFloors = (state: RootState) => state.floor.floors;
export const selectFloorsLoading = (state: RootState) =>
  state.floor.floorsLoading;
