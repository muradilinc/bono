import React from 'react';
import { X } from '@phosphor-icons/react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({ show, title, children, onClose }) => {
  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="absolute top-[50%] left-[30%] max-w-[570px] bg-black flex flex-col items-center rounded-[4px] z-[100] p-[20px]"
      style={{ display: show ? 'block' : 'none' }}
      onClick={onClose}
    >
      <div onClick={onInnerClick}>
        <div className="flex justify-between items-center mb-[20px]">
          <h2 className="font-bold text-[16px] font-comfort text-white">
            {title}
          </h2>
          <X
            size={24}
            onClick={onClose}
            className="cursor-pointer text-white"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
