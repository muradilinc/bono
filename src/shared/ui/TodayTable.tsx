import React, { SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSchedulesCommon } from '../../features/shedule/model/scheduleSlice';
import { getSchedulesCommon } from '../../features/shedule/api/scheduleThunk';
import '../style/style.css';
import { AdminIncomingPage } from '../../pages/admin/IncomingPage';

interface Props {
  setModalToday: React.Dispatch<SetStateAction<boolean>>;
}
const TodayTable = ({ setModalToday }: Props) => {
  const books = useAppSelector(selectSchedulesCommon);
  const today = new Date().toISOString().slice(0, 10);
  const filterBook = books.filter(
    (book) => book.created_at.slice(0, 10) === today,
  );
  const uniqueBooks = filterBook.filter(
    (book, index, self) => index === self.findIndex((b) => b.id === book.id),
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedulesCommon());
  }, [dispatch]);

  return (
    <div style={{ position: 'fixed', zIndex: 100, inset: 0 }}>
      <AdminIncomingPage
        filterBook={uniqueBooks}
        setModalToday={setModalToday}
      />
    </div>
  );
};

export default TodayTable;
