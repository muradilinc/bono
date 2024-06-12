import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../style/style.css';
import { AdminSliderProps } from '../types/Type';

const AdminSlider: React.FC<AdminSliderProps> = ({
  items,
  onCategoryChange,
}) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [swiperId, setSwiperId] = useState<number | undefined>(items[0]?.id);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const right = () => {
    swiper?.slideNext();
  };

  const left = () => {
    swiper?.slidePrev();
  };

  useEffect(() => {
    if (swiper) {
      setSwiperId(items[currentSlide]?.id);
      if (swiperId !== undefined) {
        onCategoryChange(swiperId);
      }
    }
  }, [swiper, currentSlide, items, swiperId, onCategoryChange]);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="mySwiper"
      >
        <div ref={prevRef} className="swiper-button-prev" onClick={left}></div>
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="h-[24px] flex justify-center items-center gap-[40px] bg-white-200 rounded-md"
          >
            <h3>{item.name}</h3>
          </SwiperSlide>
        ))}
        <div ref={nextRef} className="swiper-button-next" onClick={right}></div>
      </Swiper>
    </>
  );
};

export default AdminSlider;
