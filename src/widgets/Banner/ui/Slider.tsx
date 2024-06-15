import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useEffect } from 'react';
import { getBanners } from '../../../features/banner/api/bannerThunk';
import { selectBanners } from '../../../features/banner/model/bannerSlice';

export const Slider = () => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return (
        '<span class="' +
        className +
        ' !mx-[8px] w-[25px] h-[5px] bg-white rounded-[5px]"></span>'
      );
    },
  };
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

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
            <img className="w-full h-full object-cover" src={el.img} alt="" />
            <div className="absolute z-20 top-1/2 translate-y-[-40%] left-[5%] max-w-[830px] flex flex-col gap-[42px]">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[24px] font-normal">{banner.subtitle}</p>
                <h1 className="text-[64px] font-white font-room">
                  {banner.title}
                </h1>
              </div>
              <button className="bg-[#111111] px-[34px] py-[17px] border-[1px] border-[#D0A666] w-max">
                Забронировать стол
              </button>
            </div>
          </SwiperSlide>
        )),
      )}
    </Swiper>
  );
};
