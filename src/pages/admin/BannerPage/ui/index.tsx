import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectBanners,
  selectBannersLoading,
} from '../../../../features/banner/model/bannerSlice';
import { useEffect } from 'react';
import { getBanners } from '../../../../features/banner/api/bannerThunk';
import { PencilSimple } from '@phosphor-icons/react';
import BannerCard from './BannerCard';
import { Link } from 'react-router-dom';
import {
  selectGallery,
  selectGalleryLoading,
} from '../../../../features/gallery/model/gallerySlice';
import { getGallery } from '../../../../features/gallery/api/galleryThunk';
import GalleryMain from './Gallery';
import Loading from '../../../../shared/ui/Loading';

export const AdminBannerPage = () => {
  const banners = useAppSelector(selectBanners);
  const loadingBanner = useAppSelector(selectBannersLoading);
  const galleries = useAppSelector(selectGallery);
  const loadingGalleries = useAppSelector(selectGalleryLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getGallery());
  }, [dispatch]);

  if (loadingBanner || loadingGalleries) {
    return <Loading />;
  }

  return (
    <section className="bg-black text-white px-[30px] py-[18px] flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[24px] text-white font-comfort">
          Баннер
        </h1>
        <Link to="/admin/banner/3">
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
        <div>
          {galleries.length > 0 ? (
            <GalleryMain galleries={galleries} />
          ) : (
            <h1 className="mt-[30px]">Нету данных...</h1>
          )}
        </div>
      </div>
    </section>
  );
};
