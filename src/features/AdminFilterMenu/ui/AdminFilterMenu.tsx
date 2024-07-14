import { FC, useEffect, useState } from 'react';
import { AdminMenuCard } from '../../../entities/AdminMenuCard';
import { Link } from 'react-router-dom';
import AdminSlider from '../../../shared/ui/AdminSlide';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../category/categorySlice';
import { getCategories } from '../../category/categoryThunk';
import { selectMenu } from '../model/MenuSlica';
import { deleteMenu, getMenu } from '../api/MenuThunk';
import { selectSubCategories } from '../../../pages/admin/SubCategoryPage/model/subCategorySlice';
import { getFilterSubcategories } from '../../../pages/admin/SubCategoryPage/api/subCategoryThunk';
import Loading from '../../../shared/ui/Loading';
import { toast } from 'react-toastify';

export const AdminFilterMenu: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoryLoading = useAppSelector(selectCategoriesLoading);
  const subcategories = useAppSelector(selectSubCategories);
  const menu = useAppSelector(selectMenu);

  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<number | null>(
    null,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && currentCategory !== null) {
      dispatch(getFilterSubcategories(currentCategory));
    }
  }, [categories, currentCategory, dispatch]);

  useEffect(() => {
    if (subcategories.length > 0) {
      setCurrentSubcategory(subcategories[0].id);
      dispatch(getMenu());
    }
  }, [dispatch, subcategories]);

  const onDelete = async (id: number) => {
    try {
      await dispatch(deleteMenu(id)).unwrap();
      await dispatch(getMenu()).unwrap();
      toast.success('Удалено!');
    } catch (err) {
      toast.error('Что то пошло не так!');
    }
  };

  if (categoryLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[24px] py-[18px] px-[30px] text-white">
        <div className="flex items-center md:justify-between w-full flex-wrap justify-center">
          <h1 className="font-bold text-[24px] text-white font-comfort">
            Меню
          </h1>
          <Link to="/admin/menu-submit">
            <button className="bg-[#2B2B2B] px-[24px] py-[10px] rounded-lg flex items-center">
              + Добавить
            </button>
          </Link>
        </div>
        <div className="w-[184px] h-[70px] md:h-max text-white flex flex-row justify-around items-center gap-[15px]">
          <AdminSlider
            items={categories}
            onCategoryChange={setCurrentCategory}
          />
        </div>
      </div>
      <div className="text-white w-full  flex flex-col md:flex-row items-center justify-center gap-x-[20px] md:gap-x-[40px] md:gap-y-[20px] md:px-[30px] flex-wrap">
        {subcategories?.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => setCurrentSubcategory(item.id)}
              className={`border-b-[2px] gap-y-2 ${item.id === currentSubcategory ? 'border-white' : 'border-none'}`}
            >
              <p className="text-[10px] md:text-[16px] font-normal leading-[24px] pb-[8px]">
                {item.name}
              </p>
            </button>
          </div>
        ))}
      </div>
      <div className="w-full overflow-auto bg-black flex flex-col py-[30px] md:py-[50px] px-[10px] md:px-[30px] gap-y-3">
        <div className="flex flex-wrap gap-x-[24px] gap-y-[24px]">
          {menu?.length > 0 ? (
            menu?.filter((item) => {
              return (
                item.category === currentCategory &&
                item.subcategory === currentSubcategory
              );
            }).length > 0 ? (
              menu
                .filter((item) => {
                  return (
                    item.category === currentCategory &&
                    item.subcategory === currentSubcategory
                  );
                })
                .map((item) => (
                  <AdminMenuCard
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                  />
                ))
            ) : (
              <div className="text-white w-full text-center">Нету данных.</div>
            )
          ) : (
            <div className="text-white w-full text-center">
              Такого меню нет.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
