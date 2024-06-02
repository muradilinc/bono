import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <div className="w-full h-[540px] lg:h-[300px] bg-[#070606] lg:pt-[50px]">
      <div className="w-[90%] m-auto pt-[36px] lg:pt-[0px]">
        <div className="w-full h-full flex flex-col gap-[24px] lg:w-full lg:flex-row lg:gap-[110px]">
          <div className='flex justify-between lg:flex-col lg:h-0'>
            <div className="lg:pb-[24px]">
              <Link to={'/'}>
                <img
                  className="w-[125px] h-[33px]"
                  src="/images/bonoLogo.svg"
                  alt="bono"
                />
              </Link>
            </div>
            <div className="flex gap-[8px]">
              <a href="https://www.instagram.com/">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconInsta.svg"
                  alt="Instagram"
                />
              </a>
              <a href="https://web.telegram.org/a/">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconTelegram.svg"
                  alt="Telegram"
                />
              </a>
              <a href="https://web.whatsapp.com/">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconWhs.svg"
                  alt="whatsApp"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <div>
              <Link to={'/'}>Главная</Link>
            </div>
            <div>
              <Link to={'/'}>Кухня</Link>
            </div>
            <div>
              <Link to={'/'}>Бар</Link>
            </div>
            <div>
              <Link to={'/'}>Контакты</Link>
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div>
              <p>улица Сухэ-Батора,17</p>
              <p className="text-[#C1C1C1]">6-й мк-р, Бишкек</p>
            </div>
            <div>
              <p>С 10:00 до 02:00</p>
              <p className="text-[#C1C1C1]">каждый день без выходных</p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex pr-[4px]">
              <img
                className="pr-[5px]"
                src="/images/iconPhone.svg"
                alt="phone"
              />
              <span>+996 505 04 62 56</span>
            </div>
            <div className="flex">
              <img
                className="pr-[5px]"
                src="/images/iconEmail.svg"
                alt="email"
              />
              <a
                href="mailto:bono.bar.bishkek@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                bono.bar.bishkek@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-[36px] lg:pt-[50px]">
          <hr />
          <p className="pt-[12px]">
            © 2024 год, Bono bar. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};
