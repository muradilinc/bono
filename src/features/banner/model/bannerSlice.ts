import { createSlice } from '@reduxjs/toolkit';
import { getBanners, getBannersId, getBannersTopik } from '../api/bannerThunk';
import { RootState } from '../../../app/store/store';
import { Banners, BannersTopik } from './types';

interface BannerState {
  banners: Banners[];
  bannersLoading: boolean;
  bannersId: Banners | null;
  bannersTopik: BannersTopik[];
}

const initialState: BannerState = {
  banners: [],
  bannersLoading: false,
  bannersId: null,
  bannersTopik: [],
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

    builder.addCase(getBannersId.pending, (state) => {
      state.bannersLoading = true;
    });
    builder.addCase(getBannersId.fulfilled, (state, { payload: bannersId }) => {
      state.bannersLoading = false;
      state.bannersId = bannersId;
    });
    builder.addCase(getBannersId.rejected, (state) => {
      state.bannersLoading = false;
    });

    builder.addCase(getBannersTopik.pending, (state) => {
      state.bannersLoading = true;
    });
    builder.addCase(
      getBannersTopik.fulfilled,
      (state, { payload: bannersTopik }) => {
        state.bannersLoading = false;
        state.bannersTopik = bannersTopik;
      },
    );
    builder.addCase(getBannersTopik.rejected, (state) => {
      state.bannersLoading = false;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
export const selectBanners = (state: RootState) => state.banner.banners;
export const selectBannersId = (state: RootState) => state.banner.bannersId;
export const selectBannersTopik = (state: RootState) =>
  state.banner.bannersTopik;
export const selectBannersLoading = (state: RootState) =>
  state.banner.bannersLoading;
