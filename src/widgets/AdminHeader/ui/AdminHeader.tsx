import { FC, useEffect, useState } from 'react';
import { FilterButton } from './FilterButton';
import { Calendar } from './Calendar';
import Modal from '../../../shared/ui/Modal';
import Clients from '../../../shared/ui/clients';
import AddTable from '../../../shared/ui/AddTable';
import AddFloor from '../../../shared/ui/AddFloor';
import AddClient from '../../../shared/ui/AddClient';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectFloors } from '../../../features/floors/model/floorSlice';
import { getFloors } from '../../../features/floors/api/floorThunk';
import BtnTable from '../../scheduleTable/ui/BtnTable';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  currentDate: Value;
  currentStatus: number;
  currentFloor: number;
  setCurrentDate: (date: Value) => void;
  setCurrentStatus: (status: number) => void;
  setCurrentFloor: (floor: number) => void;
  setCurrentText: (text: string) => void;
}

export const AdminHeader: FC<Props> = ({
  currentDate,
  setCurrentDate,
  currentStatus,
  setCurrentStatus,
  currentFloor,
  setCurrentFloor,
  setCurrentText,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState('A');
  const [client, setClient] = useState<number | null>(null);
  const floors = useAppSelector(selectFloors);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setShowModal(false);
    setStep('A');
  };

  const selectClient = (id: number) => {
    setClient(id);
    setStep('K');
  };

  useEffect(() => {
    dispatch(getFloors());
  }, [dispatch]);

  return (
    <div className="w-full relative">
      <div className="flex flex-col bg-[black] p-4">
        <div className="flex gap-[30px] items-center justify-between">
          <Link
            to={'/admin/'}
            className="px-[32px] py-[12px] rounded-[8px] bg-[#6BC678] text-white"
          >
            <ArrowLeft size={24} />
          </Link>
          <Calendar setDate={setCurrentDate} />
          <FilterButton
            setAddModal={setShowModal}
            setModal={setModal}
            modal={modal}
            setCurrentFloor={(floor: number) => setCurrentFloor(floor)}
            setQueryText={(text: string) => setCurrentText(text)}
          />
        </div>
        <BtnTable setActive={(index: number) => setCurrentStatus(index)} />
      </div>
      <div>
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
              <button
                onClick={() => setStep('M')}
                className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]"
              >
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
            <AddTable onClose={closeModal} />
          ) : step === 'D' ? (
            <AddFloor onCLose={closeModal} />
          ) : step === 'E' ? (
            <Clients currentClient={(id: number) => selectClient(id)} />
          ) : step === 'M' ? (
            <div className="flex">
              <AddClient
                filter={{
                  date: dayjs(currentDate?.toString()).format('YYYY-MM-DD'),
                  floor: floors.length > 0 ? floors[currentFloor].id : 0,
                  status: currentStatus,
                }}
                onClose={closeModal}
              />
            </div>
          ) : step === 'K' ? (
            <AddClient
              filter={{
                date: dayjs(currentDate?.toString()).format('YYYY-MM-DD'),
                floor: floors.length > 0 ? floors[currentFloor].id : 0,
                status: currentStatus,
              }}
              onClose={closeModal}
              id={client!}
            />
          ) : null}
        </Modal>
      </div>
    </div>
  );
};
