import { FC, useEffect, useState } from 'react';
import { AdminMenuCard } from '../../../entities/AdminMenuCard';
import { useNavigate } from 'react-router-dom';
import AdminSlider from '../../../shared/ui/AdminSlide';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../category/categorySlice';
import { getCategories } from '../../category/categoryThunk';
import { selectMenu, selectMenuLoading } from '../model/MenuSlica';
import { deleteMenu, getMenu } from '../api/MenuThunk';
import AdminIconButton from '../../../shared/ui/AdminIconButton';
import {
  selectSubCategories,
  selectSubCategoriesLoading,
} from '../../../pages/admin/SubCategoryPage/model/subCategorySlice';
import { getFilterSubcategories } from '../../../pages/admin/SubCategoryPage/api/subCategoryThunk';
import Loading from '../../../shared/ui/Loading';

export const AdminFilterMenu: FC = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const categoryLoading = useAppSelector(selectCategoriesLoading);

  const subcategories = useAppSelector(selectSubCategories);
  const subcategoriesLoading = useAppSelector(selectSubCategoriesLoading);

  const menu = useAppSelector(selectMenu);
  const menuLoading = useAppSelector(selectMenuLoading);

  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<number | null>(
    null,
  );

  const navigate = useNavigate();

  const onDelete = async (id: number) => {
    await dispatch(deleteMenu(id));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && currentCategory) {
      dispatch(getFilterSubcategories(currentCategory));
    }
  }, [categories, currentCategory, dispatch]);

  useEffect(() => {
    if (subcategories.length > 0) {
      dispatch(getMenu());
    }
  }, [dispatch, subcategories.length]);

  if (!subcategoriesLoading) {
    console.log(subcategories);
  }

  if (categoryLoading) {
    return <Loading />;
  }

  if (!categoryLoading) {
    console.log(categories);
  }

  if (!menuLoading) {
    console.log(menu);
  }

  // console.log(currentCategory);
  // console.log(currentSubcategory);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[24px] pt-[40px]">
        <div className="flex flex-wrap justify-center gap-[16px] px-[30px]">
          <AdminIconButton
            text={'Добавить'}
            iconUrl="/images/iconPlus.svg"
            onClick={() => navigate('/admin/menu-submit')}
          />
          <AdminIconButton
            text={'Редактировать'}
            iconUrl="/images/iconEdit.svg"
            onClick={() => console.log('modal')}
          />
          <AdminIconButton
            text={'Удалить'}
            iconUrl="/images/iconDelete.svg"
            onClick={() => console.log('Modal')}
          />
        </div>
        <div className="w-[184px] h-[60px] text-white flex flex-row justify-around items-center gap-[15px]">
          <AdminSlider
            items={categories}
            onCategoryChange={setCurrentCategory}
          />
        </div>
      </div>
      <div className="text-white w-full h-[88px] flex items-center justify-center gap-x-[40px] gap-y-[20px] px-[30px] flex-wrap">
        {subcategories?.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => setCurrentSubcategory(item.id)}
              className="focus:border-b-[2px] focus:border-white gap-y-2"
            >
              <p className="text-[16px] font-normal leading-[24px] pb-[8px]">
                {item.name}
              </p>
            </button>
          </div>
        ))}
      </div>
      <div className="w-full overflow-auto bg-black flex flex-col py-[50px] px-[30px] gap-y-3">
        <div className="flex flex-wrap gap-x-[24px] gap-y-[24px]">
          {menu?.length ? (
            menu
              ?.filter((item) => {
                return (
                  item.category === currentCategory &&
                  item.subcategory === currentSubcategory
                );
              })
              .map((item) => (
                <AdminMenuCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onDelete={onDelete}
                />
              ))
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
