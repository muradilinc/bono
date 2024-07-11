import { getSchedules } from '../api/scheduleThunk';

describe('Schedules', () => {
  it('getSchedules', async () => {
    // const mockSchedules = [{}]
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      // json: ()=> Promise.resolve(mockSchedules),
    }) as jest.Mock;
    const dispatch = jest.fn();
    const thunk = getSchedules();
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(getSchedules.pending.type);
    expect(end[0].type).toBe(getSchedules.fulfilled.type);
    // expect(end[0].payload).toBe(mockSchedules)
  });

  // it('getSchedules error', async () => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     ok: false,
  //   }) as jest.Mock;
  //
  //   const dispatch = jest.fn();
  //   const thunk = getSchedules();
  //   await thunk(dispatch, () => ({}), {});
  //
  //   const { calls } = dispatch.mock;
  //   expect(calls).toHaveLength(2);
  //   const [start, end] = calls;
  //
  //   console.log(end);
  //   expect(start[0].type).toBe(getSchedules.pending.type);
  //   expect(end[0].type).toBe(getSchedules.rejected.type);
  // });
});
