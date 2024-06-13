import { btns } from '../constants/btns';
import { useState } from 'react';

const BtnTable = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const clickBtn = (index: number) => {
    setActiveButton(index);
  };
  return (
    <div className="text-white px-[20px] py-[20px]">
      <div className="flex items-center gap-[30px] h-[50px]">
        {btns.map((label, inx) => (
          <button
            key={inx}
            onClick={() => clickBtn(inx)}
            className={`hover:border-b-2 border-white ${activeButton === inx ? 'border-b-2 border-white' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-[30px] h-[50px]">
        <button className="flex items-center justify-center">
          <canvas className="bg-[#6BC678] w-[12px] h-[12px] rounded-[50%] mr-[5px]"></canvas>
          Занят
        </button>
        <button className="flex items-center justify-center">
          <canvas className="bg-[#ECA356] w-[12px] h-[12px] rounded-[50%] mr-[5px]"></canvas>
          Забронирован
        </button>
      </div>
    </div>
  );
};

export default BtnTable;
