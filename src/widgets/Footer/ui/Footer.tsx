import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_DATA } from '../../Header/constant/constant';

export const Footer: FC = () => {
  const renderTitle = useMemo(() => {
    return HEADER_DATA.map((item) => (
      <div key={item.title}>
        <a href={item.link}>{item.title}</a>
      </div>
    ));
  }, []);
  return (
    <div className="w-full h-[540px] lg:h-[300px] bg-[#070606] lg:pt-[50px]">
      <div className="w-[90%] m-auto pt-[36px] lg:pt-[0px]">
        <div className="w-full h-full flex flex-col gap-[24px] lg:w-full lg:flex-row lg:gap-[110px]">
          <div className="flex justify-between lg:flex-col lg:h-0">
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
              <Link
                target="_blank"
                to="https://www.instagram.com/bono.bar.bishkek"
              >
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconInsta.svg"
                  alt="Instagram"
                />
              </Link>
              <Link target="_blank" to="https://t.me/+996505046256">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconTelegram.svg"
                  alt="Telegram"
                />
              </Link>
              <Link target="_blank" to="https://wa.me/+996505046256">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/iconWhs.svg"
                  alt="whatsApp"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">{renderTitle}</div>
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
              <Link to="tel:+996505046256">+996 505 04 62 56</Link>
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
