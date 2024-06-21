import { useSwiper } from 'swiper/react';
import Arrow from '/images/arrow.svg';

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex gap-[50px] mt-[36px]">
      <span onClick={() => swiper.slidePrev()}>
        <img className="cursor-pointer" src={Arrow} alt="" />
      </span>
      <span onClick={() => swiper.slideNext()}>
        <img className="rotate-180 cursor-pointer" src={Arrow} alt="" />
      </span>
    </div>
  );
};
