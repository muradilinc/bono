import { getTables } from '../api/tablesThunk';

describe('Table', () => {
  it('getTables', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const dispatch = jest.fn();
    const thunk = getTables();
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(getTables.pending.type);
    expect(end[0].type).toBe(getTables.fulfilled.type);
  });
});
