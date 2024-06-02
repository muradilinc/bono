import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectBanners } from '../../../../features/banner/model/bannerSlice';
import { useEffect } from 'react';
import { getBanners } from '../../../../features/banner/api/bannerThunk';

export const AdminBannerPage = () => {
  const banners = useAppSelector(selectBanners);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  return (
    <section className="bg-black text-white px-[30px] py-[18px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-medium">
            Фотографии Главного банера
          </h1>
          <button className="bg-[#6BC678] px-[24px] py-[10px] rounded-lg">
            Сохранить
          </button>
        </div>

        <ul className="w-full flex flex-col gap-[10px]">
          {banners.map((banner) => (
            <li
              key={banner.id}
              className="flex justify-between max-h-[68px] w-full"
            >
              <div className="flex gap-[18px]">
                <img className="w-[120px]" src={banner.img} alt="banner" />
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: 23.23.23</p>
                  <p>Заголоаок: {banner.title}</p>
                </div>
              </div>
              <button className="bg-[#2B2B2B] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
                Загрузить фото
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-[10px]">
        <form className="flex flex-col gap-[5px]">
          <h3 className="text-[12px] font-medium">Заголовок</h3>
          <input
            className="w-full rounded-lg px-[24px] py-[13px] text-white bg-[#2B2B2B]"
            placeholder="изменение текста"
            type="text"
          />
        </form>
        <form className="flex flex-col gap-[5px]">
          <h3 className="text-[12px] font-medium">надзагаловок</h3>
          <input
            className="w-full rounded-lg px-[24px] py-[13px] text-white bg-[#2B2B2B]"
            placeholder="Коктейльный бар и ресторан боно приглашает вас к себе "
            type="text"
          />
        </form>
      </div>
      <div>
        <div className="flex flex-col gap-[30px]">
          <h2 className="text-[24px] font-medium">Видео</h2>
          <div>
            <div className="flex justify-between max-h-[68px] w-full">
              <div className="flex gap-[18px]">
                {/*<img src={banners.image} alt="" />*/}
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: 23.23.23</p>
                  <p>Объем фотографии: 43.3KB</p>
                </div>
              </div>
              <button className="bg-[#2B2B2B] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
                Загрузить видео
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <h2 className="text-[24px] font-medium">
            Фотография на бронирование столика
          </h2>
          <div>
            <div className="flex justify-between max-h-[68px] w-full">
              <div className="flex gap-[18px]">
                {/*<img src={banners.image} alt="" />*/}
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: 23.23.23</p>
                  <p>Объем фотографии: 43.3KB</p>ю
                </div>
              </div>
              <button className="bg-[#2B2B2B] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
                Загрузить фото
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
