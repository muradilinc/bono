import { useEffect, useState } from 'react';
import MenuCardMob from './MenuCardMob';
import MenuCard from './MenuCard';
import KitchenHelmet from '../../../app/helmet/KitchenHelmet';
import kitchenSchema from '../../../app/schema/kitchenSchema';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getCategories } from '../../../features/category/categoryThunk';
import { selectCategories } from '../../../features/category/categorySlice';
import { selectSubCategories } from '../../../pages/admin/SubCategoryPage/model/subCategorySlice';
import { getFilterSubcategories } from '../../../pages/admin/SubCategoryPage/api/subCategoryThunk';
import { getMenuByCategoryAndSubcategory } from '../../../features/AdminFilterMenu/api/MenuThunk';
import { selectMenu } from '../../../features/AdminFilterMenu/model/MenuSlica';

const MainMenu = () => {
  const [btn, setBtn] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [nameSubcategory, setNameSubcategory] = useState<string>('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const subcategories = useAppSelector(selectSubCategories);
  const menu = useAppSelector(selectMenu);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const category = categories?.find((item) => item.name === 'Kitchen');
    if (category) {
      setCategoryId(category.id);
      dispatch(getFilterSubcategories(category.id));
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (categoryId !== null) {
      const subcategoryId = subcategories?.find((item) => item.id === btn)?.id;
      if (subcategoryId) {
        dispatch(
          getMenuByCategoryAndSubcategory({ categoryId, subcategoryId }),
        );
      }
    }
  }, [dispatch, categoryId, subcategories, btn]);

  console.log(subcategories);
  console.log(menu);

  return (
    <div className="text-white pt-[170px] px-[10px] w-[90%] m-auto pb-[50px]">
      <span className="text-[14px] text-[#C1C1C1]">Main / menu</span>
      <div className="mt-[30px] flex items-center flex-wrap gap-[10px]">
        {subcategories?.map((item) => (
          <button
            onClick={() => {
              setBtn(item.id), setNameSubcategory(item.name);
            }}
            className={`ml-[10px] ${btn === item.id ? 'border-white border-b-2' : ''}`}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>
      <h1 className="lg:text-[36px] md:text-[32px] sm:text-[27px] text-[24px] mt-[30px]">
        {nameSubcategory}
      </h1>
      {menu.length > 0 ? <MenuCard menu={menu} /> : 'Меню нет'}
      <MenuCardMob />
      <KitchenHelmet />
      <script type="application/ld+json">
        {JSON.stringify(kitchenSchema)}
      </script>
    </div>
  );
};

export default MainMenu;
