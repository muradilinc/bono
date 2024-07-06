import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFloors, getSingleFloor, initFloor } from '../api/floorThunk';
import { RootState } from '../../../app/store/store';
import { Floor } from './floors';

interface FloorState {
  floors: Floor[];
  floor: Floor | null;
  floorsLoading: boolean;
  floorInitLoading: boolean;
  floorSingleLoading: boolean;
}

const initialState: FloorState = {
  floors: [],
  floor: null,
  floorsLoading: false,
  floorInitLoading: false,
  floorSingleLoading: false,
};

const floorSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initFloor.pending, (state) => {
      state.floorInitLoading = true;
    });
    builder.addCase(initFloor.fulfilled, (state) => {
      state.floorInitLoading = false;
    });
    builder.addCase(initFloor.rejected, (state) => {
      state.floorInitLoading = false;
    });
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
    builder.addCase(getSingleFloor.pending, (state) => {
      state.floorSingleLoading = true;
    });
    builder.addCase(
      getSingleFloor.fulfilled,
      (state, { payload: floor }: PayloadAction<Floor>) => {
        state.floorSingleLoading = false;
        state.floor = floor;
      },
    );
    builder.addCase(getSingleFloor.rejected, (state) => {
      state.floorSingleLoading = false;
    });
  },
});

export const floorsReducer = floorSlice.reducer;
export const selectFloors = (state: RootState) => state.floor.floors;
export const selectFloorsLoading = (state: RootState) =>
  state.floor.floorsLoading;
export const selectFloor = (state: RootState) => state.floor.floor;
export const selectFloorLoading = (state: RootState) =>
  state.floor.floorSingleLoading;
