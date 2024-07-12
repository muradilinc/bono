import { SubCategoriesPage } from '../ui';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import {
  deleteSubCategory,
  getSingleSubCategory,
  getSubCategories,
} from '../api/subCategoryThunk';
import { configureStore } from '@reduxjs/toolkit';
import { subCategoryReducer } from '../model/subCategorySlice';

describe('SubCategoryPage', () => {
  it('should create sub-category with empty sub-categories', () => {
    const { container } = renderWithProviders(<SubCategoriesPage />);
    expect(container).toMatchSnapshot();
  });
});

describe('getSubcategories', () => {
  describe('getSubcategories', () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    it('get sub-categories from  api', async () => {
      const dispatch = jest.fn();
      const thunk = getSubCategories();
      await thunk(dispatch, () => ({}), {});

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start, end] = calls;
      expect(start[0].type).toBe(getSubCategories.pending.type);
      expect(end[0].type).toBe(getSubCategories.fulfilled.type);
    });

    it('get single sub-category from api', async () => {
      const store = configureStore({
        reducer: {
          subCategory: subCategoryReducer,
        },
      });
      await store.dispatch(getSubCategories());
      const state = store.getState();
      const firstSubCategory = state.subCategory.subCategories[0].id;

      const dispatch = jest.fn();
      const thunk = getSingleSubCategory(firstSubCategory.toString());
      await thunk(dispatch, () => ({}), {});

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start, end] = calls;
      expect(start[0].type).toBe(getSingleSubCategory.pending.type);
      expect(end[0].type).toBe(getSingleSubCategory.fulfilled.type);
    });

    it('delete sub-category', async () => {
      const store = configureStore({
        reducer: {
          subCategory: subCategoryReducer,
        },
      });
      await store.dispatch(getSubCategories());
      const state = store.getState();
      const firstSubCategory = state.subCategory.subCategories[0].id;

      const dispatch = jest.fn();
      const thunk = deleteSubCategory(firstSubCategory);
      await thunk(dispatch, () => ({}), {});

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);

      const [start, end] = calls;
      expect(start[0].type).toBe(deleteSubCategory.pending.type);
      expect(end[0].type).toBe(deleteSubCategory.fulfilled.type);
    });
  });
});
