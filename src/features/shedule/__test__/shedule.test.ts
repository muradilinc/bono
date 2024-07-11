import { configureStore } from '@reduxjs/toolkit';
import { scheduleReducer } from '../model/scheduleSlice';
import { getSchedules } from '../api/scheduleThunk';

describe('getSchedules', () => {
  test('fetch schedule', async () => {
    const store = configureStore({
      reducer: {
        schedule: scheduleReducer,
      },
    });
    await store.dispatch(getSchedules());
    const state = store.getState();
    const schedules = state.schedule.schedules;

    expect(schedules.length).toBeGreaterThan(0);
    expect(schedules[0]).toHaveProperty('id');
  });
});
