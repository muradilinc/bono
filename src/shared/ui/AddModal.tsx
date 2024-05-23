import { useEffect, useRef, useState } from 'react';
import AddClient from './AddClient';

const AddModal = () => {
  const [addModal, setAddModal] = useState<boolean>(true);
  const refModal = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<boolean>(false);

  const onClickClient = () => {
    setModal(true);
    setAddModal(false);
  };
  useEffect(() => {
    if (addModal) {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(0)';
      }
    } else {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(-100%)';
      }
    }
  }, [addModal, modal]);
  return (
    <>
      {modal ? (
        <AddClient modal={modal} setModal={setModal} />
      ) : (
        <div
          ref={refModal}
          className="absolute w-[100%] flex justify-center rounded-[8px] mt-[160px] z-[100]"
        >
          <div className="w-[400px] h-[272px] bg-white flex flex-col items-center rounded-[8px]">
            <div className="flex items-center justify-between bg-[#F4FAFF] py-[15px] px-[15px] w-[100%] rounded-[8px]">
              <h2 className="text-[rgba(0,0,0,0.6)] text-[17px] font-bold">
                Выберите одну из них
              </h2>
              <span
                onClick={() => setAddModal(false)}
                className="text-[rgba(0,0,0,0.6)] text-[20px] cursor-pointer"
              >
                &#x2715;
              </span>
            </div>
            <button
              onClick={onClickClient}
              className="bg-[#F8F8F8] text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[rgba(87,128,235,1)] hover:text-white"
            >
              Добавить клиента
            </button>
            <button className="bg-[#F8F8F8] text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] w-[80%] duration-300 hover:bg-[rgba(87,128,235,1)] hover:text-white">
              Добавить стол
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
