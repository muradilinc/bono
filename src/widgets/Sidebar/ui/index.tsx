import { Link } from 'react-router-dom';
import { links } from '../../../app/constants/links';
import { useState } from 'react';
import { useAppSelector } from '../../../app/store/hooks';
import { selectBannersLoading } from '../../../features/banner/model/bannerSlice';
import Loading from '../../../shared/ui/Loading';
import { selectCategoriesLoading } from '../../../features/category/categorySlice';
import { selectMenuLoading } from '../../../features/AdminFilterMenu/model/MenuSlica';
import { selectSchedulesLoading } from '../../../features/shedule/model/scheduleSlice';
import { selectSubCategoriesLoading } from '../../../pages/admin/SubCategoryPage/model/subCategorySlice';

export const Sidebar = () => {
  const [active, setActive] = useState<number | null>(null);
  const loadingBanner = useAppSelector(selectBannersLoading);
  const loadingCatalog = useAppSelector(selectCategoriesLoading);
  const loadingMenu = useAppSelector(selectMenuLoading);
  const loadingIncoming = useAppSelector(selectSchedulesLoading);
  const loadingSubCategory = useAppSelector(selectSubCategoriesLoading);

  const isLoading = loadingBanner || loadingCatalog || loadingMenu || loadingIncoming ||
    loadingSubCategory;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <aside className="w-full max-w-[210px] flex flex-col gap-[50px] bg-[#2B2B2B]">
      <div className="bg-[#2B2B2B] p-[16px] flex items-center">
        <h6 className="font-semibold text-[17px] text-white">Админ. панель</h6>
      </div>
      <div className="p-[16px] flex flex-col gap-[20px]">
        <ul className="flex flex-col gap-[10px]">
          {links.map((link, idx) => (
            <Link to={link.path} key={idx}> <li
              onClick={() => setActive(idx)}
              className={`${active === idx ? 'border-b-2 border-white' : ''} p-[10px] hover:bg-[#3D3D3D] hover:opacity-100 rounded-[8px] duration-300 font-medium opacity-90 text-white`}
              key={idx}
            >
             {link.name}
            </li></Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};