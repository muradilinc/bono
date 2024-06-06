import { FC } from 'react';
import { AdminButtonType } from '../types/Type';

export const AdminButton: FC<AdminButtonType> = ({ title, icon, onSubmit }) => {
  return (
    <div>
      <button onClick={onSubmit} className="flex justify-center items-center bg-[#2B2B2B] text-white h-[56px] rounded-[4px] w-[234px] duration-300 hover:bg-[#ebebeb]">
        <img className="pr-[10.5px]" src={icon} alt="icon" />
        {title}
      </button>
    </div>
  );
};
