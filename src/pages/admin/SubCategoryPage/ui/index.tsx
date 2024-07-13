import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectSubCategories,
  selectSubCategoriesLoading,
} from '../model/subCategorySlice';
import { deleteSubCategory, getSubCategories } from '../api/subCategoryThunk';
import { Link } from 'react-router-dom';
import { Pen, Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import Loading from '../../../../shared/ui/Loading';

export const SubCategoriesPage = () => {
  const subCategories = useAppSelector(selectSubCategories);
  const loading = useAppSelector(selectSubCategoriesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  const handleDeleteCategory = async (id: number) => {
    try {
      await dispatch(deleteSubCategory(id)).unwrap();
      await dispatch(getSubCategories()).unwrap();
      toast.success('Удалено!');
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="flex items-center justify-between flex-wrap w-full h-[60px] bg-black px-[20px] mt-[10px]">
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
                className="flex items-center justify-between my-[20px] flex-wrap"
              >
                <div className="flex items-center">
                  <div className="text-white ml-[15px]">
                    <div className="flex flex-col gap-x-3">
                      <h4>
                        Категории:{' '}
                        {subCategory.parent_details
                          ? subCategory.parent_details.name
                          : 'Нету!'}
                      </h4>
                      <p>Название: {subCategory.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <Link
                    className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                    to={`/admin/sub-category-submit/${subCategory.id}`}
                  >
                    <Pen size={24} />
                  </Link>
                  <button
                    onClick={() => handleDeleteCategory(subCategory.id)}
                    className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                  >
                    <Trash size={20} />
                  </button>
                </div>
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
