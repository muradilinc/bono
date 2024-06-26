import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectSubCategories } from '../model/subCategorySlice';
import { deleteSubCategory, getSubCategories } from '../api/subCategoryThunk';
import { Link } from 'react-router-dom';
import { Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

export const SubCategoriesPage = () => {
  const subCategories = useAppSelector(selectSubCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  const handleDeleteCategory = async (id: number) => {
    try {
      await dispatch(deleteSubCategory(id)).unwrap();
      toast.success('Удалено!');
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="text-white font-semibold">Под Категории</h1>
        <Link
          to="/admin/sub-category-submit"
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] py-[10px] px-[15px]"
        >
          + Добавить
        </Link>
      </header>

      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <div>
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <div
                key={subCategory.id}
                className="flex items-center justify-between my-[20px]"
              >
                <div className="flex items-center">
                  <div className="text-white ml-[15px]">
                    <div className="flex items-center gap-x-3">
                      <p>Название: {subCategory.name}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCategory(subCategory.id)}
                  className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                >
                  <Trash size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">Пусто</p>
          )}
        </div>
      </section>
    </>
  );
};
