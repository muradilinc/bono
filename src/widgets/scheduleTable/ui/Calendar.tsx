import { useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
  deleteBook,
  getSchedules,
  getSingleBook,
  updateBook,
} from '../../../features/shedule/api/scheduleThunk';
import {
  selectBook,
  selectDeleteBookLoading,
  selectSchedules,
  selectSchedulesLoading,
  selectUpdateBookLoading,
} from '../../../features/shedule/model/scheduleSlice';
import { times } from '../constants/times';
import { selectTables } from '../../../features/tables/model/tableSlice';
import Loading from '../../../shared/ui/Loading';

interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  table: number;
  occupied: boolean;
  is_come: boolean;
}

const Calendar = () => {
  const schedules = useAppSelector(selectSchedules);
  const [modal, setModal] = useState<boolean>(false);
  const [selectClient, setSelectClient] = useState<number>(0);
  const updateLoading = useAppSelector(selectUpdateBookLoading);
  const deleteLoading = useAppSelector(selectDeleteBookLoading);
  const tables = useAppSelector(selectTables);
  const clientApi = useAppSelector(selectBook);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSchedulesLoading);

  useEffect(() => {
    if (selectClient) {
      dispatch(getSingleBook(selectClient));
    }
  }, [dispatch, selectClient]);

  const handleDeleteBook = async (id: number) => {
    await dispatch(deleteBook(id)).unwrap();
    await dispatch(getSchedules()).unwrap();
    setModal(false);
  };

  const handleChangeStatusBook = async (id: number) => {
    await dispatch(updateBook(id)).unwrap();
    await dispatch(getSchedules()).unwrap();
    setModal(false);
  };

  const slots: Slot[] = schedules.map((book) => {
    return {
      id: book.id,
      startTime: book.start_time,
      endTime: book.end_time,
      table: book.table,
      occupied: true,
      is_come: book.is_come,
    };
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[black] relative">
      <div className="ml-[20px] bg-[#2B2B2B] px-[10px] rounded-[4px]">
        <div className="flex flex-col relative">
          <div className="flex  items-center sticky top-0 z-10 bg-[#2B2B2B]">
            <div className="w-[85px] text-wrap">
              <h4 className="font-comfort  text-white font-medium text-[14px]">
                Столы / время
              </h4>
            </div>
            {tables.map((table) => (
              <div
                key={table.id}
                className="min-w-[124px] border-l border-[#414141] text-white z-10 flex items-center justify-center text-[18px] font-comfort font-medium"
              >
                <span>{`№${table.number_table}`}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex gap-y-[35px] flex-col pr-[24px]">
              {times.map((time, index) => (
                <div
                  key={index}
                  className="items-center text-white font-comfort font-medium text-[24px]"
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <div className="relative flex">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="min-w-[124px] relative border-l-[1px] border-[#414141]"
                >
                  {slots
                    .filter((slot) => slot.table === table.id)
                    .map((slot) => (
                      <TimeSlot
                        key={slot.id}
                        onOpen={() => setModal(true)}
                        client={(id: number) => setSelectClient(id)}
                        slot={slot}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal ? (
        <div className="absolute top-[30%] w-[100%] flex justify-center rounded-[8px] z-[100]">
          <div className="w-[400px] bg-black flex flex-col items-center rounded-[8px] py-[15px] px-[15px] gap-y-3">
            <div className="flex items-center justify-between w-[100%] rounded-[8px]">
              <h2 className="text-white text-[17px] font-bold">
                Выберите одну из них
              </h2>
              <span
                onClick={() => setModal(false)}
                className="text-white text-[20px] cursor-pointer"
              >
                &#x2715;
              </span>
            </div>
            <div className="text-white flex flex-col">
              <p>Имя: {clientApi?.user_name}</p>
              <p>
                Время: {clientApi?.start_time} - {clientApi?.end_time}
              </p>
              <p>Кол-во: {clientApi?.amount_guest}</p>
              <p>Телефон: {clientApi?.phone_number}</p>
              <p>Коммент: {clientApi?.comment}</p>
            </div>
            <div className="flex flex-col gap-y-3 w-full">
              <button
                onClick={() => handleDeleteBook(selectClient)}
                className="border border-white text-white rounded-[5px] w-full py-3"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Удаление...' : 'Удалить'}
              </button>
              <button
                onClick={() => handleChangeStatusBook(selectClient)}
                className="border border-white text-white rounded-[5px] w-full py-3"
                disabled={updateLoading}
              >
                {updateLoading
                  ? 'Меняется статус бронирование...'
                  : 'Гости пришли'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Calendar;
