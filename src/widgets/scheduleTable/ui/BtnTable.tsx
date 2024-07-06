import { btns } from '../constants/btns';
import React, { useState } from 'react';

interface Props {
  setActive: (index: number) => void;
}

const BtnTable: React.FC<Props> = ({ setActive }) => {
  const [activeButton, setActiveButton] = useState<number | null>(0);

  const clickBtn = (index: number) => {
    setActiveButton(index);
    setActive(index);
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
        <div className="flex items-center gap-x-[5px]">
          <div className="bg-orange-700 w-[12px] h-[12px] rounded-[50px]" />
          <button>Занят</button>
        </div>
        <div className="flex gap-x-[5px] items-center">
          <div className="bg-green-700 w-[12px] h-[12px] rounded-[50px]" />
          <button>Забронирован</button>
        </div>
      </div>
    </div>
  );
};

export default BtnTable;
