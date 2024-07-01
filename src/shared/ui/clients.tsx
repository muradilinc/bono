import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSchedules } from '../../features/shedule/model/scheduleSlice';
import { getSchedules } from '../../features/shedule/api/scheduleThunk';

interface Props {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

const Clients: React.FC<Props> = ({ modal, setModal }) => {
  const books = useAppSelector(selectSchedules);
  const filterBook = books.filter((book) => book.table === null);
  const dispatch = useAppDispatch();
  const refModal = useRef<HTMLDivElement>(null);
  const refBg = useRef<HTMLDivElement>(null);
  const refClose = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (modal) {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(0)';
      }
    } else {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(-100%)';
      }
    }
  }, [modal]);

  const onClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === refBg.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={refModal}
      className="absolute w-[100%] flex justify-center z-[100] mt-[30px]"
    >
      <div
        ref={refBg}
        onClick={onClickBg}
        className="fixed bg-transparent left-0 right-0 bottom-0 top-0 w-full z-[99]"
      ></div>
      <div
        ref={refClose}
        className="w-[400px] h-[850px] mb-[30px] bg-black flex flex-col items-center rounded-[8px] z-[100]"
      >
        <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
          <h2 className="text-white text-[17px] font-bold">Добавить клиента</h2>
          <span
            onClick={() => setModal(false)}
            className="text-white text-[20px] cursor-pointer"
          >
            &#x2715;
          </span>
        </div>
      </div>
      {filterBook.map((client) => (
        <div>
          <p>{client.user_name}</p>
          <p>{client.phone_number}</p>
          <p>{client.will_come}</p>
          <p>{client.start_time}</p>
          <p>{client.end_time}</p>
          <p>{client.time_stamp}</p>
        </div>
      ))}
    </div>
  );
};

export default Clients;
