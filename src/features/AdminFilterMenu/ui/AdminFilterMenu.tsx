import { FC, useEffect, useMemo, useState } from 'react';
import { DataMenuCard } from '../model/types/type';
import { AdminMenuCard } from '../../../entities/AdminMenuCard';
import { useNavigate } from 'react-router-dom';
import { AdminButton } from '../../../shared/ui/AdminButton';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectCategories, selectCategoriesLoading } from '../../category/categorySlice';
import { getCategories } from '../../category/categoryThunk';
import { getSubcategory } from '../api/SubCategoryThunk';
import { selectSubcategory } from '../model/slice/SubcategorySlice';
import { selectSchedulesLoading } from '../../shedule/model/scheduleSlice';
import AdminSlider from '../../../shared/ui/AdminSlide';
import { selectMenu, selectMenuLoading } from '../model/slice/MenuSlice';
import { getMenu } from '../api/MenuThunk';

export const AdminFilterMenu: FC = () => {
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const subcategory = useAppSelector(selectSubcategory);
  const subcategoryLoading = useAppSelector(selectSchedulesLoading);
  const menu = useAppSelector(selectMenu);
  const menuLoading = useAppSelector(selectMenuLoading);
  const [dataMenu, setDataMenu] = useState<DataMenuCard[]>([]);

  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<number | null>(null);

  console.log(currentCategory);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      dispatch(getSubcategory(Number(currentCategory)));
    }
  }, [categories, currentCategory, dispatch]);

  useEffect(() => {
    if (subcategory.length > 0) {
      dispatch(getMenu(Number(currentSubcategory)));
    }
  }, [currentCategory, currentSubcategory, dispatch]);

  console.log(subcategory);

  const renderFilter = useMemo(() => {
  //   const onFiltered = (title: string, id: number) => {
  //     if (title === 'Все') {
  //       setDataMenu(DATA_MENU_CARD);
  //     } else {
  //       setCurrentSubcategory(id);
  //       const filteredData = DATA_MENU_CARD?.filter(item => item.category === title);
  //       setDataMenu(filteredData);
  //     }
  //   };

    return subcategory?.map((item, index) => (
      <div key={index}>
        <button
          // onClick={() => onFiltered(item.name, item.id)}
          className="py-[10px] px-[15px] hover:border-b hover:border-white"
        >
          {item.name}
        </button>
      </div>
    ));
  }, [subcategory]);

  const onDelete = (id: number) => {
    const deleteData = dataMenu?.filter(item => item.id !== id);
    setDataMenu(deleteData);
  };

  const onNavigate = () => {
    navigate('/admin/menu-submit');
  };

  const onSubmit = () => {
    console.log(categories);
    console.log(subcategory);
    console.log(menu);
  };

  if (categoriesLoading || subcategoryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-around items-center gap-[15px] border-l border-opacity-0">
      <div className="flex flex-col items-center">
        <div className="flex gap-[16px] pt-[40px] pb-[24px]">
          <AdminButton
            title="Добавить"
            icon="/images/Plus.svg"
            onSubmit={onNavigate}
          />
          <AdminButton
            title="Редактировать"
            icon="/images/iconEdit.svg"
            onSubmit={onSubmit}
          />
          <AdminButton
            title="Удалить"
            icon="/images/iconDelete.svg"
            onSubmit={onSubmit}
          />
        </div>
        <div className="w-[184px]">
          <AdminSlider
            items={categories}
            onCategoryChange={setCurrentCategory}
          />
        </div>
        <div className="w-full flex items-center gap-[12px]">
          {renderFilter}
        </div>
      </div>
      <div className="w-full h-full overflow-auto bg-black flex flex-row flex-wrap justify-center py-[50px] px-[30px] gap-y-3">
        <div className="flex flex-wrap gap-[24px]">
          {!menuLoading && menu ? (
            <AdminMenuCard
              id={menu.id}
              image={menu.image}
              title={menu.title}
              description={menu.description}
              price={menu.price}
              onDelete={onDelete}
            />
          ) : (
            <div className="text-white w-full text-center">
              Такого меню нет.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
