import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { images } from '../constants/constants';
export const Slider = () => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={20}
      centeredSlides={true}
      className="h-full w-full max-h-[500px]"
    >
      {images.map((img) => (
        <SwiperSlide className="!h-[500px] !w-[960px]" key={img.id}>
          <img
            className="block w-full h-full object-cover"
            src={img.img}
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
