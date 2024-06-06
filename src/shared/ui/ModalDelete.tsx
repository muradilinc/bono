import { IAddModal } from '../types/Type';
import { useEffect, useRef } from 'react';

const ModalDelete = ({ addModal, setAddModal, onDelete }: IAddModal) => {
  const refModal = useRef<HTMLDivElement>(null);
  const refBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addModal) {
      if (refModal.current && refBg.current) {
        refModal.current.style.transform = 'translateX(0)';
        refBg.current.style.display = 'block';
      }
    } else {
      if (refModal.current && refBg.current) {
        refModal.current.style.transform = 'translateX(-100%)';
        refBg.current.style.display = 'none';
      }
    }
  }, [addModal]);

  return (
    <>
      <div
        ref={refModal}
        className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[100] transition-transform duration-300 transform -translate-x-full"
      >
        <div className="w-[400px] h-[272px] bg-black flex flex-col items-center rounded-[8px]">
          <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
            <h2 className="text-white text-[17px] font-bold">Вы уверены?</h2>
            <span
              onClick={() => setAddModal(false)}
              className="text-white text-[20px] cursor-pointer"
            >
              &#x2715;
            </span>
          </div>
          <button
            onClick={() => setAddModal(false)}
            className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]"
          >
            Отменить
          </button>
          <button
            onClick={onDelete}
            className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 hover:bg-[#6BC678]"
          >
            Удалить
          </button>
        </div>
      </div>
      <div
        ref={refBg}
        className="fixed bg-[#00000050] left-0 right-0 bottom-0 top-0 w-full z-[99] hidden"
      ></div>
    </>
  );
};

export default ModalDelete;
