// import { guests } from '../config/constants';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectSchedules } from '../../../../features/shedule/model/scheduleSlice';
import { useEffect } from 'react';
import { getSchedules } from '../../../../features/shedule/api/scheduleThunk';
import { Pen, Plus, Trash } from '@phosphor-icons/react';

export const AdminIncomingPage = () => {
  const books = useAppSelector(selectSchedules);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <section className="flex h-svh">
      <div className="w-full h-full bg-black p-8">
        <div className="bg-black p-[16px] flex items-center">
          <h1 className="font-bold text-[20px] text-white font-comfort">
            Входящие
          </h1>
        </div>
        <div className="flex justify-between flex-row gap-x-3 items-center">
          <button className="font-medium text-[16px] bg-[#2B2B2B] text-white w-full py-8 rounded-[4px] flex justify-center items-center gap-x-3">
            <Plus size={20} />
            Добавить
          </button>
          <button className="font-medium text-[16px] bg-[#2B2B2B] text-white w-full py-8 rounded-[4px] flex justify-center items-center gap-x-3">
            <Pen size={20} />
            Редактировать
          </button>
          <button className="font-medium text-[16px] bg-[#2B2B2B] text-white w-full py-8 rounded-[4px] flex justify-center items-center gap-x-3">
            <Trash size={20} />
            Удалить
          </button>
        </div>
        {books.length > 0 ? (
          <div className="text-white font-medium mt-[30px]">
            <table className="table-auto w-full text-center">
              <thead className="border-b border-white">
                <tr>
                  <th>№</th>
                  <th>Имя</th>
                  <th>Номер телефона</th>
                  <th>Дата и время</th>
                  <th>Длительность</th>
                  <th>Кол-во</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr>
                    <td className="p-5">{book.id}</td>
                    <td>{book.user_name}</td>
                    <td>{book.phone_number}</td>
                    <td>{book.will_come}</td>
                    <td>{book.time_stamp}</td>
                    <td>{book.amount_guest}</td>
                    <td>{book.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="text-white text-center">Нету</h4>
        )}
      </div>
    </section>
  );
};
