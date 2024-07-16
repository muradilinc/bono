import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';
import { categoryReducer } from '../../features/category/categorySlice';
import { galleryReducer } from '../../features/gallery/model/gallerySlice';
import { menuReducer } from '../../features/AdminFilterMenu/model/MenuSlica';
import { tableReducer } from '../../features/tables/model/tableSlice';
import { floorsReducer } from '../../features/floors/model/floorSlice';
import { subCategoryReducer } from '../../pages/admin/SubCategoryPage/model/subCategorySlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { usersReducer } from '../../features/auth/model/authSlice';

const usersPersistConfig = {
  key: 'store:users',
  storage: storage,
  whitelist: ['user'],
};

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
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
        },
      }),
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
