import { FC } from 'react';
import { DataMenuCard } from '../model/type/types';

export const AdminMenuCard: FC<DataMenuCard> = ({
  img,
  title,
  text,
  gram,
  price,
}) => {
  return (
    <div className="w-[379px] h-[479px] gap-[16px] bg-transparent text-white">
      <div className="">
        <img src={img} alt="menu picture" />
      </div>
      <div className="text-2xl font-bold leading-7 pt-[10px] pb-[16px]">
        {title}
      </div>
      <div className="text-base font-normal leading-5 text-left pb-[15px]">
        {text}
      </div>
      <div className="text-base font-normal leading-5 text-left pb-[8px]">
        {gram} Грамм
      </div>
      <div className="font-bold text-2xl">{price} сом</div>
    </div>
  );
};
