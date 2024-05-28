import { IAddModal } from '../types/Type';
import { useEffect, useRef } from 'react';

const ModalDelete = ({ addModal, setAddModal }: IAddModal) => {
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
        className="absolute w-[100%] flex justify-center rounded-[8px] mt-[160px] z-[100]"
      >
        <div className="w-[400px] h-[272px] bg-white flex flex-col items-center rounded-[8px]">
          <div className="flex items-center justify-between bg-[#F4FAFF] py-[15px] px-[15px] w-[100%] rounded-[8px]">
            <h2 className="text-[rgba(0,0,0,0.6)] text-[17px] font-bold">
              Вы уверены?
            </h2>
            <span
              onClick={() => setAddModal(false)}
              className="text-[rgba(0,0,0,0.6)] text-[20px] cursor-pointer"
            >
              &#x2715;
            </span>
          </div>
          <button
            onClick={() => setAddModal(false)}
            className="bg-[#F8F8F8] text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[rgba(87,128,235,1)] hover:text-white"
          >
            Отменить
          </button>
          <button className="bg-[#F8F8F8] text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] w-[80%] duration-300 hover:bg-[rgba(87,128,235,1)] hover:text-white">
            Удалить
          </button>
        </div>
      </div>
      <div
        ref={refBg}
        className="fixed bg-[#00000050] left-0 right-0 bottom-0 top-0 w-full z-[99]"
      ></div>
    </>
  );
};

export default ModalDelete;
