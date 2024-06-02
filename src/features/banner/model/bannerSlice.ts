import { createSlice } from '@reduxjs/toolkit';
import { getBanners } from '../api/bannerThunk';
import { RootState } from '../../../app/store/store';
import { Banners } from './types';

interface BannerState {
  banners: Banners[];
  bannersLoading: boolean;
}

const initialState: BannerState = {
  banners: [],
  bannersLoading: false,
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state) => {
      state.bannersLoading = true;
    });
    builder.addCase(getBanners.fulfilled, (state, { payload: banners }) => {
      state.bannersLoading = false;
      state.banners = banners;
    });
    builder.addCase(getBanners.rejected, (state) => {
      state.bannersLoading = false;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
export const selectBanners = (state: RootState) => state.banner.banners;
export const selectBannersLoading = (state: RootState) =>
  state.banner.bannersLoading;
