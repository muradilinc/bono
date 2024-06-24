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

  useEffect(() => {
    if (
      swiper &&
      swiper.params.navigation &&
      typeof swiper.params.navigation !== 'boolean'
    ) {
      const navigation = swiper.params.navigation;
      if (navigation) {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiper.navigation.update();
      }
    }
  }, [swiper]);

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
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="mySwiper"
      >
        <div ref={prevRef} className="swiper-button-prev"></div>
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="h-[24px] w-[184px] flex justify-center items-center gap-[40px] bg-white-200 rounded-md"
          >
            <h3>{item.name}</h3>
          </SwiperSlide>
        ))}
        <div ref={nextRef} className="swiper-button-next"></div>
      </Swiper>
    </>
  );
};

export default AdminSlider;
