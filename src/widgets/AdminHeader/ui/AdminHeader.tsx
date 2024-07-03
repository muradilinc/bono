import { FC, useState } from 'react';
import { FilterButton } from './FilterButton';
import { Calendar } from './Calendar';
import Modal from '../../../shared/ui/Modal';
import Clients from '../../../shared/ui/clients';

export const AdminHeader: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState('A');

  const closeModal = () => {
    setShowModal(false);
    setStep('A');
  };

  return (
    <div className="relative">
      <div className="w-full flex justify-b items-center bg-[black] p-4">
        <div className="w-full flex gap-[30px] items-center justify-b">
          <Calendar />
          <FilterButton
            setAddModal={setShowModal}
            setModal={setModal}
            modal={modal}
          />
        </div>
      </div>
      <Modal show={showModal} title="Добавить" onClose={closeModal}>
        {step === 'A' ? (
          <div className="w-[400px]  bg-black flex flex-col items-center rounded-[8px] z-[100]">
            <button
              onClick={() => setStep('B')}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]"
            >
              Добавить клиента
            </button>
            <button
              onClick={() => setStep('C')}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 mb-[10px] hover:bg-[#6BC678]"
            >
              Добавить стол
            </button>
            <button
              onClick={() => setStep('D')}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 mb-[10px] hover:bg-[#6BC678]"
            >
              Добавить этаж
            </button>
          </div>
        ) : step === 'B' ? (
          <div className="w-[400px] h-[272px] bg-black flex flex-col items-center rounded-[8px] z-[100]">
            <button className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]">
              Ручное добавление клиента
            </button>
            <button
              onClick={() => setStep('E')}
              className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 hover:bg-[#6BC678]"
            >
              Автоматическое добавление клиента
            </button>
          </div>
        ) : step === 'C' ? (
          <div>
            <h4>form table</h4>
          </div>
        ) : step === 'D' ? (
          <div>
            <h4>floor form</h4>
          </div>
        ) : step === 'E' ? (
          <Clients />
        ) : null}
      </Modal>
    </div>
  );
};
