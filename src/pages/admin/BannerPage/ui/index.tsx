import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectBanners } from '../../../../features/banner/model/bannerSlice';
import { useEffect } from 'react';
import { getBanners } from '../../../../features/banner/api/bannerThunk';
import { PencilSimple } from '@phosphor-icons/react';
import BannerCard from './BannerCard';
import { Link } from 'react-router-dom';
import { selectGallery } from '../../../../features/gallery/model/gallerySlice';
import { getGallery } from '../../../../features/gallery/api/galleryThunk';

export const AdminBannerPage = () => {
  const banners = useAppSelector(selectBanners);
  const galleries = useAppSelector(selectGallery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getGallery);
  }, [dispatch]);
  console.log(galleries);
  return (
    <section className="bg-black text-white px-[30px] py-[18px] flex flex-col gap-[30px] min-h-[700px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-medium">Баннер</h1>
        <Link to="/admin/banner/1">
          <button className="bg-[#2B2B2B] px-[24px] py-[10px] rounded-lg flex items-center">
            <PencilSimple size={24} className="mr-[5px]" />
            Редактировать
          </button>{' '}
        </Link>
      </div>
      {banners.length > 0 ? (
        <div>
          <h1 className="text-[20px] font-medium mt-[10px]">
            ФОТОГРАФИИ ГЛАВНОГО БАННЕРА
          </h1>
          {banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      ) : (
        <h1>Пусто</h1>
      )}
      <div>
        <h1 className="text-[20px] font-medium mt-[10px]">
          ФОТОГРАФИИ РЕСТОРАНА
        </h1>
      </div>
    </section>
  );
};
