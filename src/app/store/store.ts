import { configureStore } from '@reduxjs/toolkit';
import { bannerReducer } from '../../features/banner/model/bannerSlice';
import { scheduleReducer } from '../../features/shedule/model/scheduleSlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
