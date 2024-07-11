import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';
import { categoryReducer } from '../../features/category/categorySlice';
import { galleryReducer } from '../../features/gallery/model/gallerySlice';
import { menuReducer } from '../../features/AdminFilterMenu/model/MenuSlica';
import { tableReducer } from '../../features/tables/model/tableSlice';
import { floorsReducer } from '../../features/floors/model/floorSlice';
import { subCategoryReducer } from '../../pages/admin/SubCategoryPage/model/subCategorySlice';

const rootReducer = combineReducers({
  banner: bannerReducer,
  schedule: scheduleReducer,
  category: categoryReducer,
  gallery: galleryReducer,
  menu: menuReducer,
  categorySubcategory: categoryReducer,
  table: tableReducer,
  floor: floorsReducer,
  subCategories: subCategoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
