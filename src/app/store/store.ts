import { configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';
import { categoryReducer } from '../../features/category/categorySlice';
import { galleryReducer } from '../../features/gallery/model/gallerySlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    schedule: scheduleReducer,
    category: categoryReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
