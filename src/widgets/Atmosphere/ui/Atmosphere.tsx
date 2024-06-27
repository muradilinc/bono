import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getGallery } from '../../../features/gallery/api/galleryThunk';
import { selectGallery } from '../../../features/gallery/model/gallerySlice';
import { Slider } from './Slider';

export const Atmosphere = () => {
  const dispatch = useAppDispatch();
  const gallery = useAppSelector(selectGallery);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <section className="bg-[#070606] py-[30px] flex flex-col gap-[50px] h-svh container my-[200px]">
      <div className="flex flex-col gap-[16px]">
        <h3 className="font-comfort font-normal text-[36px]">
          Атмосфера ресторана
        </h3>
        <p className="font-comfort font-medium text-[16px]">
          В ресторане Bono вас ждет гармония вкусов и ощущений. Уютные уголки,
          мягкие диваны и элегантное освещение создают неповторимую атмосферу,
          идеально подходящую для любого повода — от романтического ужина до
          вечеринки с друзьями.
        </p>
      </div>
      <div className="flex-wrap h-full gap-[25px] hidden md:flex">
        {gallery
          .slice(0, 4) // Сначала обрезаем массив до первых 4 элементов
          .map((img, idx: number) => (
            <div
              className={`w-full h-auto object-cover ${idx === 0 || idx === 3 ? 'basis-[48vw]' : 'basis-[38vw]'}`}
              key={img.id}
            >
              <img
                className={`object-cover w-full h-full max-h-[375px]`}
                src={'http://3.87.95.146/' + img.image_set[0].image}
                alt=""
              />
            </div>
          ))}
      </div>
      <Slider />
    </section>
  );
};
