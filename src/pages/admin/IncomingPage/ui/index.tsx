import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectSchedules,
  selectSchedulesLoading,
} from '../../../../features/shedule/model/scheduleSlice';
import { useEffect, useState } from 'react';
import { getSchedules } from '../../../../features/shedule/api/scheduleThunk';
import '../style/style.css';
import AdminIncomingTbody from './AdminIncomingTbody';
import FormAddClient from '../../../../shared/ui/FormAddClient';
import { AdminIncomingType } from '../../../../shared/types/Type';
import Loading from '../../../../shared/ui/Loading';

export const AdminIncomingPage = () => {
  const books = useAppSelector(selectSchedules) as AdminIncomingType[];
  const loading = useAppSelector(selectSchedulesLoading);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  const filterBook = books.filter((book) => book.table === null);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative">
        <section className="flex">
          <div className="w-full h-full bg-black p-8">
            <div className="bg-black p-[16px] flex items-center justify-between">
              <h1 className="font-bold text-[20px] text-white font-comfort">
                Входящие
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#6BC678] text-white px-[36px] py-[12px] rounded-[4px]"
              >
                Добавить +
              </button>
            </div>
            {filterBook.length > 0 ? (
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
                      <th className="pb-[10px]">Редак-ть</th>
                      <th className="pb-[10px]">Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterBook.map((book, inx) => (
                      <AdminIncomingTbody book={book} inx={inx} key={book.id} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h4 className="text-white text-center mt-60">Нету входящих</h4>
            )}
          </div>
        </section>
      </div>
      {showModal && <FormAddClient onClose={() => setShowModal(false)} />}
    </>
  );
};
