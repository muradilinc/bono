import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export const Slider = () => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="h-full">
      <SwiperSlide className="h-full relative">
        <img
          className="w-full h-full object-cover"
          src="/images/banner.png"
          alt=""
        />
        <div className="absolute z-20 top-1/2 translate-y-[-40%] left-[5%] max-w-[830px] flex flex-col gap-[42px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[24px] font-normal">Выделяесь среди других</p>
            <h1 className="text-[64px] font-white">
              Коктейльный бар и ресторан{' '}
              <span className="text-[#D0A666]">боно</span> приглашает вас к себе
            </h1>
          </div>
          <button className="bg-[#111111] px-[34px] py-[17px] border-[1px] border-[#D0A666] w-max">
            Забронировать стол
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full relative">
        <img
          className="w-full h-full object-cover"
          src="/images/banner.png"
          alt=""
        />
        <div className="absolute z-20 top-1/2 translate-y-[-40%] left-[5%] max-w-[830px] flex flex-col gap-[42px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[24px] font-normal">Выделяесь среди других</p>
            <h1 className="text-[64px] font-white">
              Коктейльный бар и ресторан{' '}
              <span className="text-[#D0A666]">боно</span> приглашает вас к себе
            </h1>
          </div>
          <button className="bg-[#111111] px-[34px] py-[17px] border-[1px] border-[#D0A666] w-max">
            Забронировать стол
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full relative">
        <img
          className="w-full h-full object-cover"
          src="/images/banner.png"
          alt=""
        />
        <div className="absolute z-20 top-1/2 translate-y-[-40%] left-[5%] max-w-[830px] flex flex-col gap-[42px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[24px] font-normal">Выделяесь среди других</p>
            <h1 className="text-[64px] font-white">
              Коктейльный бар и ресторан{' '}
              <span className="text-[#D0A666]">боно</span> приглашает вас к себе
            </h1>
          </div>
          <button className="bg-[#111111] px-[34px] py-[17px] border-[1px] border-[#D0A666] w-max">
            Забронировать стол
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
