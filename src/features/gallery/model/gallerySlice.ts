import { createSlice } from '@reduxjs/toolkit';
import { getGallery } from '../api/galleryThunk';
import { Gallery } from './type';
import { RootState } from '../../../app/store/store';

interface GalleryState {
  galleries: Gallery[];
  galleryLoaded: boolean;
}
const initialState: GalleryState = {
  galleries: [],
  galleryLoaded: false,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGallery.pending, (state) => {
      state.galleryLoaded = true;
    });
    builder.addCase(getGallery.fulfilled, (state, { payload: galleries }) => {
      state.galleryLoaded = false;
      state.galleries = galleries;
    });
    builder.addCase(getGallery.rejected, (state) => {
      state.galleryLoaded = false;
    });
  },
});

export const galleryReducer = gallerySlice.reducer;
export const selectGallery = (state: RootState) => state.gallery.galleries;
