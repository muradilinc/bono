import imgKuh from '../../../../public/images/menuKuhnya.svg';
import imgBar from '../../../../public/images/menuBar.svg';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className="w-[90%] m-auto py-[30px] bg-[#070606] text-white">
      <h1 className="xl:text-[36px] lg:text-[32px] md:text-[28px] text-[24px]">
        Меню
      </h1>
      <p className="text-[#C1C1C1] md:text-[15px] text-[14px]">
        Наслаждайтесь гармонией вкусов в каждом блюде
      </p>
      <div className="flex mt-[30px] flex-wrap gap-[30px]">
        <div className="relative flex-auto h-[435px] max-h-[435px]">
          <img
            className="rounded-[4px] w-full h-full object-cover"
            src={imgKuh}
            alt="no img"
          />
          <Link to={'/kitchen'}>
            <h6 className="absolute left-0 bottom-0 right-0 bg-[rgba(23,23,23,0.6)] pl-[30px] py-[10px] sm:text-[20px] text-[16px]">
              Кухня
            </h6>
          </Link>
        </div>
        <div className="relative flex-auto h-[435px] max-h-[435px]">
          <img
            className="rounded-[4px] w-full h-full object-cover"
            src={imgBar}
            alt="no img"
          />
          <h6 className="absolute left-0 bottom-0 right-0 bg-[rgba(23,23,23,0.6)] pl-[30px] py-[10px] sm:text-[20px] text-[16px]">
            Бар
          </h6>
        </div>
      </div>
    </div>
  );
};
