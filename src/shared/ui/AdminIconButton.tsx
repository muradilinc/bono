import { FC } from 'react';
import { IconButtonProps } from '../types/Type';

const AdminIconButton: FC<IconButtonProps> = ({ text, iconUrl, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[234px] h-[56px] flex items-center justify-center bg-[#2B2B2B] rounded-[4px] text-white"
    >
      <img src={iconUrl} alt={`${text} icon`} className="w-4 h-4 mr-2" />
      {text}
    </button>
  );
};

export default AdminIconButton;
