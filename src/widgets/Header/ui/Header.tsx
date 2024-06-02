import { FC, useMemo, useState } from 'react';
import { HEADER_DATA } from '../constant/constant';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const renderTitle = useMemo(() => {
    return HEADER_DATA.map((item) => (
      <div key={item.title}>
        <Link to={item.link}>{item.title}</Link>
      </div>
    ));
  }, [HEADER_DATA]);
  return (
    <div className="w-full h-[128px] bg-black text-white">
      <div className="w-[90%] h-full m-auto">
        <div className="hidden lg:flex h-1/2 items-center justify-end">
          <div className="flex gap-1 pr-[24px]">
            <img className="pb-1" src="/images/iconPhone.svg" alt="phone" />
            <span>+996 505 04 62 56</span>
          </div>
          <div className="flex gap-1">
            <img src="/images/iconEmail.svg" alt="email" />
            <a
              href="mailto:bono.bar.bishkek@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              bono.bar.bishkek@gmail.com
            </a>
          </div>
        </div>
        <div className="h-full lg:h-1/2 flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="/images/bonoLogo.svg" alt="bono" />
            </Link>
          </div>
          <div className="hidden lg:flex gap-[44px]">{renderTitle}</div>
          <div className="hidden lg:flex">
            <a className="flex items-center" href="https://www.instagram.com/">
              <img
                className="pr-[16px]"
                src="/images/iconInsta.svg"
                alt="insta"
              />
            </a>
            <img
              className="pr-[7px] align-middle"
              src="/images/iconLocation.svg"
              alt="location"
            />
            <span>2 Gis</span>
          </div>
          <div className="lg:hidden">
            {!isOpen ? (
              <button onClick={() => setIsOpen(true)}>
                <img src="/images/burgerMenu.svg" alt="menu" />
              </button>
            ) : (
              <button onClick={() => setIsOpen(false)}>
                <img src="/images/menuCross.svg" alt="close" />
              </button>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="w-[100%] h-screen absolute left-0 z-10 flex flex-col items-center text-center gap-[32px] bg-[#070606] lg:hidden">
            {renderTitle}
          </div>
        )}
      </div>
    </div>
  );
};
