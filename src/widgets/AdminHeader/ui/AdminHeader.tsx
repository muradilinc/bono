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
import {
  ArrowLeft,
  MagnifyingGlass,
  Plus,
  UsersThree,
} from '@phosphor-icons/react';
import { selectUserCrm } from '../../../features/auth/model/authSlice';
import { logoutCrm } from '../../../features/auth/api/authThunk';
import TodayTable from '../../../shared/ui/TodayTable';

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
  const [modalToday, setModalToday] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState('A');
  const [client, setClient] = useState<number | null>(null);
  const [text, setText] = useState('');
  const userCrm = useAppSelector(selectUserCrm);
  const floors = useAppSelector(selectFloors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFloors());
  }, [dispatch]);

  useEffect(() => {
    setCurrentText(text);
  }, [setCurrentText, text]);

  const closeModal = () => {
    setShowModal(false);
    setStep('A');
  };

  const selectClient = (id: number) => {
    setClient(id);
    setStep('K');
  };
  const openModal = () => {
    setShowModal(true);
    setModal(!modal);
  };

  const logoutHandle = async () => {
    try {
      await dispatch(logoutCrm());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col bg-[black] p-4">
        <div className="flex gap-[30px] items-center ">
          <div className="flex items-center gap-x-3 justify-between w-[500px]">
            {userCrm ? (
              <button
                onClick={logoutHandle}
                className="h-[47px] px-[32px] py-[12px] rounded-[8px] bg-[#6BC678] text-white"
              >
                <ArrowLeft size={24} />
              </button>
            ) : null}
            <button
              onClick={openModal}
              className="h-[47px] px-[32px] py-[12px] rounded-[8px] bg-[#6BC678] text-white"
            >
              <Plus size={24} />
            </button>
            <Calendar setDate={setCurrentDate} />
            <div className="w-[150px] h-[47px] flex rounded-[8px] bg-[#2B2B2B] items-center justify-center">
              <MagnifyingGlass className="w-[20px] h-[20px] text-white ml-[10px]" />
              <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Поиск"
                className="w-[90%] py-[10px] outline-none bg-[#2B2B2B] rounded-[8px] text-white pl-[5px]"
              />
            </div>
          </div>
          <button
            onClick={() => setModalToday(true)}
            className="px-[18px] py-[12px] rounded-[8px] bg-[#6BC678] text-white"
          >
            <UsersThree size={27} />
          </button>

          <FilterButton
            setAddModal={setShowModal}
            setModal={setModal}
            modal={modal}
            setCurrentFloor={(floor: number) => setCurrentFloor(floor)}
            currentFloor={currentFloor}
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
                setCurrentFloor={setCurrentFloor}
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
              setCurrentFloor={setCurrentFloor}
              onClose={closeModal}
              id={client!}
            />
          ) : null}
        </Modal>
        {modalToday && <TodayTable setModalToday={setModalToday} />}
      </div>
    </div>
  );
};
