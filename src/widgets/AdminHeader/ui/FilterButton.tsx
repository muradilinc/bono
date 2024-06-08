import { FC, useState } from 'react';
import { FILTERED_BTN } from '../config/constants';
import { CaretLeft, CaretRight, MagnifyingGlass } from '@phosphor-icons/react';

interface Props {
  setAddModal: (modal: boolean) => void;
  setModal: (modal: boolean) => void;
  modal: boolean;
}
export const FilterButton: FC<Props> = ({ setAddModal, setModal, modal }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const openModal = () => {
    setAddModal(true);
    setModal(!modal);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FILTERED_BTN.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + FILTERED_BTN.length) % FILTERED_BTN.length,
    );
  };

  return (
    <>
      <div className="h-[47px] w-[850px] px-[12px] flex items-center justify-center gap-[10px] rounded-[8px] bg-black text-white">
        <CaretLeft size={30} onClick={handlePrev} />
        <div className="w-[170px] text-center text-[20px]">
          {FILTERED_BTN[currentIndex].title}
        </div>
        <CaretRight size={30} onClick={handleNext} />
      </div>
      <div className="w-[150px] h-[47px] flex rounded-[8px] bg-[#2B2B2B] items-center justify-center">
        <MagnifyingGlass className="w-[20px] h-[20px] text-white ml-[10px]" />
        <input
          type="text"
          placeholder="Поиск"
          className="w-[90%] py-[10px] outline-none bg-[#2B2B2B] rounded-[8px] text-white pl-[5px]"
        />
      </div>
      <div>
        <button
          onClick={openModal}
          className="h-[47px] px-[32px] py-[12px] rounded-[8px] bg-[#6BC678] text-white"
        >
          Добавить +
        </button>
      </div>
    </>
  );
};
