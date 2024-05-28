import { banners } from '../config/constants';

export const AdminBannerPage = () => {
  return (
    <section className="bg-black text-white px-[30px] py-[18px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-medium">
            Фотографии Главного банера
          </h1>
          <button className="bg-[#5780EB] px-[24px] py-[10px] rounded-lg">
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
                <img src={banner.image} alt="" />
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: {banner.load_date}</p>
                  <p>Объем фотографии: {banner.size}</p>
                </div>
              </div>
              <button className="bg-[#5780EB] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
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
            className="w-full rounded-lg px-[24px] py-[13px] text-black"
            placeholder="изменение текста"
            type="text"
          />
        </form>
        <form className="flex flex-col gap-[5px]">
          <h3 className="text-[12px] font-medium">надзагаловок</h3>
          <input
            className="w-full rounded-lg px-[24px] py-[13px] text-black"
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
                <img src={banners[0].image} alt="" />
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: {banners[0].load_date}</p>
                  <p>Длительность видео: {banners[0].time}</p>
                </div>
              </div>
              <button className="bg-[#5780EB] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
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
                <img src={banners[0].image} alt="" />
                <div className="flex flex-col justify-center">
                  <p>Дата загрузки: {banners[0].load_date}</p>
                  <p>Объем фотографии: {banners[0].time}</p>
                </div>
              </div>
              <button className="bg-[#5780EB] px-[24px] py-[10px] rounded-lg text-[16px] h-max w-max self-center">
                Загрузить фото
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
