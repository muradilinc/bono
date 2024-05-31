import { useRef } from 'react';
import { INameManager } from '../types/Type';

const ModalDelManager = ({ nameManager }: INameManager) => {
  const refModal = useRef<HTMLDivElement>(null);
  const refModal2 = useRef<HTMLDivElement | null>(null);
  const modalTime = () => {
    if (refModal.current && refModal2.current) {
      refModal.current.style.display = 'none';
      refModal2.current.style.display = 'block';
      setTimeout(() => {
        if (refModal2.current) {
          refModal2.current.style.display = 'none';
        }
      }, 3000);
    }
  };
  const closeModal = () => {
    if (refModal.current) {
      refModal.current.style.display = 'none';
    }
  };
  return (
    <>
      <div ref={refModal} className="absolute w-[100%] top-[40%] z-10">
        <div className="flex items-center justify-center">
          <div className="bg-black w-[440px] py-[30px] rounded-[10px] flex flex-col items-center justify-center text-white">
            <h2 className="font-semibold text-[17px] text-center">
              Вы действительно хотите удалить менеджера?
            </h2>
            <div>
              <div className="flex items-center gap-[10px] mt-[20px]">
                <button
                  onClick={modalTime}
                  className="rounded-[50px] w-[80px] h-[40px] bg-[#2B2B2B] hover:bg-[#6BC678] duration-300"
                >
                  Да
                </button>
                <button
                  onClick={closeModal}
                  className="rounded-[50px] w-[80px] h-[40px] bg-[#2B2B2B] hover:bg-[#6BC678] duration-300"
                >
                  Нет
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div ref={refModal2} style={{ display: 'none' }}>
          <div className="absolute flex items-center justify-center w-[100%] top-[40%] z-10">
            <div className="flex items-center justify-center bg-black w-[400px] h-[66px] rounded-[50px]">
              <p className="bg-[#8CDF7E] w-[25px] h-[25px] rounded-[50%] flex items-center justify-center text-white">
                ✓
              </p>
              <h3 className="flex flex-col ml-[10px] leading-[20px] text-white">
                {nameManager} <span className="text-[#F98C8C]">удален</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelManager;
