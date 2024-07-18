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
            <div className="absolute z-20 top-1/2 translate-y-[-40%] left-[50%] translate-x-[-50%] w-full sm:w-[unset] px-[30px] sm:max-w-[830px] flex flex-col gap-[42px] items-center">
              <div className="flex w-full flex-col items-center gap-[10px] text-center">
                <p className="text-[16px] md:text-[24px] font-sans w-full text-right pr-11 lg:text-right lg:pr-1 pb-[10px]">
                  {/* {banner.subtitle} */}
                  бар & ресторан
                </p>
                <h1 className="text-[100px] md:text-[185px] leading-[70px] md:leading-[150px] font-comfort font-white">
                  <img src="/images/logo.png" alt="Logo" />
                </h1>
              </div>
              <a
                className="w-full sm:w-[unset] hover:bg-black transition"
                href="/#reservationForm"
              >
                <button className="bg-transparent px-[24px] py-[16px] rounded border-[1px] border-white w-full md:w-max font-sans">
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
