import { configureStore } from '@reduxjs/toolkit';
import { menuReducer } from '../../../../features/AdminFilterMenu/model/MenuSlica';
import {
  getMenu,
  //   getMenuByCategory,
} from '../../../../features/AdminFilterMenu/api/MenuThunk';
// import axios from 'axios';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getMenu', () => {
  it('fetch menu', async () => {
    const store = configureStore({
      reducer: {
        menu: menuReducer,
      },
    });
    await store.dispatch(getMenu());
    const state = store.getState();
    const menus = state.menu.menu;

    expect(menus.length).toBeGreaterThan(0);
    expect(menus[0]).toHaveProperty('id');
  });

  //   it('fetches menu items by category successfully', async () => {
  //     const store = configureStore({
  //       reducer: {
  //         menu: menuReducer,
  //       },
  //     });

  //     const mockMenuItems = [
  //       {
  //         id: 43,
  //         name: 'Красное вино',
  //       },
  //       {
  //         id: 44,
  //         name: 'Белое вино',
  //       },
  //       {
  //         id: 45,
  //         name: 'Розовое вино',
  //       },
  //       {
  //         id: 46,
  //         name: 'Игристое вино',
  //       },
  //     ];

  //     mockedAxios.get.mockResolvedValueOnce({ data: mockMenuItems });

  //     const categoryId: number = 22;
  //     await store.dispatch(getMenuByCategory({ categoryId }));

  //     const state = store.getState();
  //     const { menuLoading } = state.menu;

  //     // expect(menu).toEqual(mockMenuItems);
  //     // expect(menu.length).toBeGreaterThan(0);
  //     expect(menuLoading).toBeFalsy();
  //   });

  //   it('fetch create menu', async () => {
  //     const store = configureStore({
  //         reducer: {
  //             menu: menuReducer,
  //         }
  //     });

  //     const newMenuItem = {
  //         title: 'New Menu',
  //         price: 150,
  //         description: 'Delicious new menu item',
  //         image: null,
  //         category: 1,
  //         subcategory: 1,
  //       };

  //     await store.dispatch(createMenu(newMenuItem));

  //     const state = store.getState();
  //     const {menu, menuLoading} = state.menu;

  //     expect(menu).toContainEqual({ id: 90, ...newMenuItem });
  //     expect(menuLoading).toBeFalsy();
  //   });
});
