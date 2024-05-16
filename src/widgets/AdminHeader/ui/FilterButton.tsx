import { FC } from 'react';
import { FILTERED_BTN } from '../config/constants';

export const FilterButton: FC = () => {
  return (
    <>
      <div className="h-[47px] px-[12px] flex items-center gap-[10px] rounded-[8px] bg-[#FDFDFD]">
        {FILTERED_BTN?.map((item) => (
          <div key={item.title}>
            <button className="rounded-[8px] p-[8px]  hover:bg-[black] hover:text-white">
              {item.title}
            </button>
          </div>
        ))}
      </div>
      <div className="w-[345px] h-[47px] flex rounded-[8px] bg-[#FDFDFD]">
        <div className="w-[12%] m-auto">
          <img
            src="/search-normal.svg"
            alt="search"
            className="w-[18px] h-[24px] m-auto"
          />
        </div>
        <input
          type="text"
          placeholder="Поиск"
          className="w-[90%] py-[10px] outline-none bg-[#FDFDFD] rounded-[8px]"
        />
      </div>
      <div>
        <button className="h-[47px] px-[32px] py-[12px] rounded-[8px] bg-[#FDFDFD]">
          Добавить +
        </button>
      </div>
    </>
  );
};
