import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectSchedules,
  selectSchedulesLoading,
} from '../../../../features/shedule/model/scheduleSlice';
import { getSchedules } from '../../../../features/shedule/api/scheduleThunk';
import Loading from '../../../../shared/ui/Loading';
import { Link } from 'react-router-dom';
import { API_LINK } from '../../../../app/constants/links';

export const CommonPage = () => {
  const books = useAppSelector(selectSchedules);
  const loading = useAppSelector(selectSchedulesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full h-full bg-black p-8">
        <div className="bg-black p-[16px] flex items-center justify-between">
          <h1 className="font-bold text-[20px] text-white font-comfort">
            Общее
          </h1>
          <Link
            to={API_LINK + '/book/download-booking/'}
            className="bg-[#6BC678] text-white px-[36px] py-[12px] rounded-[4px] capitalize"
          >
            скачать таблицу
          </Link>
        </div>
      </div>
      {books.length > 0 ? (
        <div className="text-white font-medium mt-[30px] overflow-y-scroll max-h-[750px] bookScroll">
          <table className="table-auto w-full text-center">
            <thead className="border-b border-white bg-black sticky top-0">
              <tr>
                <th className="pb-[10px]">№</th>
                <th className="pb-[10px]">Имя</th>
                <th className="pb-[10px]">Номер телефона</th>
                <th className="pb-[10px]">Дата и время</th>
                <th className="pb-[10px]">Длительность</th>
                <th className="pb-[10px]">Кол-во</th>
                <th className="pb-[10px]">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, inx) => (
                <tr key={book.id}>
                  <td className="p-5">{inx + 1}</td>
                  <td>{book.user_name}</td>
                  <td>{book.phone_number}</td>
                  <td className="flex flex-col items-center justify-center">
                    <p>{book.will_come}</p>
                    <p>
                      {book.start_time} - {book.end_time}
                    </p>
                  </td>
                  <td>{book.time_stamp}</td>
                  <td>{book.amount_guest} пер.</td>
                  <td className="max-w-[100px]">{book.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-white text-center mt-60">Нету входящих</h4>
      )}
    </div>
  );
};
