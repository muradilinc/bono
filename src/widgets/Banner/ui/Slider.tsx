import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useEffect } from 'react';
import { getBanners } from '../../../features/banner/api/bannerThunk';
import {
  selectBanners,
  selectBannersLoading,
} from '../../../features/banner/model/bannerSlice';
import Loading from '../../../shared/ui/Loading';

export const Slider = () => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);
  const loading = useAppSelector(selectBannersLoading);

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return (
        '<span class="' +
        className +
        ' !mx-[8px] w-[10px] h-[10px] bg-white rounded-[50%]"></span>'
      );
    },
  };
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Swiper
      pagination={pagination}
      navigation={true}
      modules={[Navigation, Pagination]}
      className="h-full"
    >
      {banners.flatMap((banner) =>
        banner.topik_baner.map((el) => (
          <SwiperSlide key={el.id} className="h-full relative">
            <img
              className="w-full h-full object-cover"
              src={el.img}
              alt="imgBanner"
            />
            <div className="absolute z-20 left-0 bottom-0 right-0 top-0 items-center justify-center  flex flex-col gap-[52px]">
              <div className="flex flex-col items-center">
                <h1 className="lg:text-[90px] md:text-[80px] text-[70px] font-white font-room leading-[90px]">
                  {banner.title}
                </h1>
                <p className="lg:text-[24px] sm:text-[21px] text-[18px] font-normal text-center">
                  {banner.subtitle}
                </p>
              </div>
              <a href="/#reservationForm">
                <button className="bg-transparent px-[34px] py-[17px] border-[1px] rounded-[4px] border-white w-max">
                  Забронировать стол
                </button>
              </a>
            </div>
          </SwiperSlide>
        )),
      )}
    </Swiper>
  );
};
