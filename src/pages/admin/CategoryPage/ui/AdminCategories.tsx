import { ICategoryProp } from '../Type/Type';
import { AdminCategoriesCard } from './AdminCategoriesCard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getCategories } from '../../../../features/category/categoryThunk';
import { selectCategories } from '../../../../features/category/categorySlice';

export const AdminCategories = ({ setActiveBtn }: ICategoryProp) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  // const loading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="font-bold text-[20px] text-white font-comfort">
          Категории
        </h1>
        <button
          onClick={() => setActiveBtn('Добавить категорию')}
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] w-[125px] h-[40px]"
        >
          + Добавить
        </button>
      </header>

      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <div>
          {categories.length > 0 ? (
            categories.map((category) => (
              <AdminCategoriesCard category={category} key={category.id} />
            ))
          ) : (
            <h4 className="text-white text-center mt-60">Нету категории</h4>
          )}
        </div>
      </section>
    </>
  );
};
