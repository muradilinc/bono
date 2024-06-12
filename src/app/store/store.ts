import { configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';
import { categoryReducer } from '../../features/category/categorySlice';
import { subcategoryReducer } from '../../features/AdminFilterMenu/model/slice/SubcategorySlice';
import { menuReducer } from '../../features/AdminFilterMenu/model/slice/MenuSlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    schedule: scheduleReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    menu: menuReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
