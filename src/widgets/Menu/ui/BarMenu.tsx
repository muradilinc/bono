import { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getCategories } from '../../../features/category/categoryThunk';
import { selectCategories } from '../../../features/category/categorySlice';
import {
  selectSubCategories,
  selectSubCategoriesLoading,
} from '../../../pages/admin/SubCategoryPage/model/subCategorySlice';
import { getFilterSubcategories } from '../../../pages/admin/SubCategoryPage/api/subCategoryThunk';
import {
  getMenu,
  getMenuByCategoryAndSubcategory,
} from '../../../features/AdminFilterMenu/api/MenuThunk';
import {
  selectMenu,
  selectMenuLoading,
} from '../../../features/AdminFilterMenu/model/MenuSlica';
import { SubCategory } from '../../../pages/admin/SubCategoryPage/model/sub-category';
import Loading from '../../../shared/ui/Loading';
import BarHelmet from '../../../app/helmet/BarHelmet';
import barSchema from '../../../app/schema/BarSchema';
import { Helmet } from 'react-helmet-async';

const BarMenu = () => {
  const [btn, setBtn] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [nameSubcategory, setNameSubcategory] = useState<string>('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const subcategories = useAppSelector(selectSubCategories);
  const isLoadingSubcategories = useAppSelector(selectSubCategoriesLoading);
  const menu = useAppSelector(selectMenu);
  const loading = useAppSelector(selectMenuLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const category = categories?.find((item) => item.name === 'Бар');
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
  }, [dispatch, categoryId, subcategories, btn, isLoadingSubcategories]);

  const handleSubCategories = (item: SubCategory) => {
    setBtn(item.id);
    setNameSubcategory(item.name);
    const id = categories.find((item) => item.name === 'Бар')?.id;
    setCategoryId(id ?? null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-white pt-[170px] px-[10px] w-[90%] m-auto pb-[50px]">
      <BarHelmet />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(barSchema)}</script>
      </Helmet>
      <span className="text-[14px] text-[#C1C1C1]">Main / bar</span>
      <div className="mt-[30px] flex items-center flex-wrap gap-[10px]">
        <button
          onClick={() => {
            dispatch(getMenu());
            setBtn(0);
          }}
          className={`ml-[10px] ${btn === 0 ? 'border-white border-b-2' : ''}`}
        >
          Все
        </button>
        {subcategories?.map((item) => (
          <button
            onClick={() => handleSubCategories(item)}
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
      {menu.length > 0 ? (
        !loading ? (
          <MenuCard
            type="bar"
            menu={menu.filter((item) => item.category === categoryId)}
          />
        ) : (
          <Loading />
        )
      ) : (
        <p>Еще нет позиций</p>
      )}
    </div>
  );
};

export default BarMenu;
