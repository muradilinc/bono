import AddClient from './AddClient';
import { useEffect, useRef, useState } from 'react';
import AddClientAuto from './AddClientAuto';
import { IAddModal2 } from '../types/Type';

const AddModalAuto = ({ addModal2, setAddModal2, refBg }: IAddModal2) => {
  // const [addModal, setAddModal] = useState<boolean>(true);
  const refModal = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);

  const onClickClient = () => {
    setModal(true);
    setAddModal2(false);
  };
  const onClickClientAuto = () => {
    setModal2(true);
    setAddModal2(false);
  };
  useEffect(() => {
    if (addModal2) {
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
  }, [addModal2, refBg]);
  useEffect(() => {
    if (!modal && !modal2) {
      setAddModal2(true);
    }
  }, [modal, modal2, refBg, setAddModal2]);
  return (
    <>
      {modal && <AddClient modal={modal} setModal={setModal} />}
      {modal2 && <AddClientAuto modal2={modal2} setModal2={setModal2} />}

      {!modal && !modal2 && (
        <div
          ref={refModal}
          className="absolute w-[100%] flex justify-center rounded-[8px] mt-[160px] z-[100]"
        >
          <div className="w-[400px] h-[272px] bg-black flex flex-col items-center rounded-[8px]">
            <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
              <h2 className="text-white text-[17px] font-bold">
                Выберите одну из них
              </h2>
              <span
                onClick={() => setAddModal2(false)}
                className="text-white text-[20px] cursor-pointer"
              >
                &#x2715;
              </span>
            </div>
            <button
              onClick={onClickClient}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]"
            >
              Ручное добавление клиента
            </button>
            <button
              onClick={onClickClientAuto}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 hover:bg-[#6BC678]"
            >
              Автоматическое добавление клиента
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalAuto;
