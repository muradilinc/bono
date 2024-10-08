import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  Schedule,
  selectSchedulesCommonLoading,
  selectSchedulesIncoming,
  selectSchedulesIncomingLoading,
} from '../../../../features/shedule/model/scheduleSlice';
import React, { SetStateAction, useEffect, useState } from 'react';
import { getSchedulesIncoming } from '../../../../features/shedule/api/scheduleThunk';
import '../style/style.css';
import AdminIncomingTbody from './AdminIncomingTbody';
import FormAddClient from '../../../../shared/ui/FormAddClient';
import Loading from '../../../../shared/ui/Loading';
import { X } from '@phosphor-icons/react';

interface Props {
  filterBook?: Schedule[];
  setModalToday?: React.Dispatch<SetStateAction<boolean>>;
}

export const AdminIncomingPage = ({ filterBook, setModalToday }: Props) => {
  const books = useAppSelector(selectSchedulesIncoming);
  const loading = useAppSelector(selectSchedulesIncomingLoading);
  const loadingToday = useAppSelector(selectSchedulesCommonLoading);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSchedulesIncoming());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  const dataToDisplay =
    filterBook && filterBook.length > 0 ? filterBook : books;
  const onClose = () => {
    if (setModalToday) {
      setModalToday(false);
    }
  };

  return (
    <>
      <div className="relative">
        <section className="flex">
          <div className="w-full h-full bg-black p-4 md:p-8">
            <div className="bg-black p-[16px] flex items-center justify-between flex-wrap">
              <h1 className="font-bold text-[20px] text-white font-comfort">
                {filterBook ? 'Сегодня' : 'Входящие'}
              </h1>
              {filterBook ? (
                <X
                  size={24}
                  onClick={onClose}
                  className="cursor-pointer text-white"
                />
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#6BC678] text-white px-[36px] py-[12px] rounded-[4px]"
                >
                  Добавить +
                </button>
              )}
            </div>
            {loadingToday ? (
              <Loading />
            ) : dataToDisplay.length > 0 ? (
              <div className="text-white font-medium mt-[30px] overflow-y-scroll max-h-[750px] pb-[200px] bookScroll">
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
                    {dataToDisplay.map((book, inx) => (
                      <AdminIncomingTbody
                        book={book}
                        inx={inx}
                        key={book.id}
                        filterBook={filterBook}
                      />
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
