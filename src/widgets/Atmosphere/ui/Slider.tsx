import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectGallery } from '../../../features/gallery/model/gallerySlice';
import { useEffect } from 'react';
import { getGallery } from '../../../features/gallery/api/galleryThunk';
import { SwiperNavButtons } from './SwiperNavButton';

export const Slider = () => {
  const dispatch = useAppDispatch();
  const gallery = useAppSelector(selectGallery);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={20}
      centeredSlides={true}
      className="md:hidden h-full w-full max-h-[500px] flex flex-col items-center"
    >
      <SwiperNavButtons />
      {gallery.map((item) => (
        <SwiperSlide key={item.id} className="!h-[245px] !w-full rounded">
          <img
            className="block w-full h-full object-cover rounded-[4px]"
            src={'https://backend.bono-bar.com' + item.image_set[0].image}
            alt={item.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
