import { configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';
import { categoryReducer } from '../../features/category/categorySlice';
import { galleryReducer } from '../../features/gallery/model/gallerySlice';
import { menuReducer } from '../../features/AdminFilterMenu/model/MenuSlica';
import { subcategoryReducer } from '../../features/AdminFilterMenu/model/SubcategorySlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    schedule: scheduleReducer,
    category: categoryReducer,
    gallery: galleryReducer,
    menu: menuReducer,
    subcategory: subcategoryReducer,
    categorySubcategory: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
