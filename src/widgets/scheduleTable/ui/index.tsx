import { AdminHeader } from '../../AdminHeader';
import Calendar from './Calendar';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectSchedules } from '../../../features/shedule/model/scheduleSlice';
import { useEffect } from 'react';
import { getSchedules } from '../../../features/shedule/api/scheduleThunk';

const ScheduleTable = () => {
  const schedules = useAppSelector(selectSchedules);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  console.log(schedules);

  const slots = schedules.map((book) => {
    return {
      id: book.id,
      startTime: book.start_time,
      endTime: book.end_time,
      table: book.table,
      occupied: true,
      is_come: book.is_come,
    };
  });

  return (
    <div className="flex flex-col">
      <AdminHeader />
      <Calendar slots={slots} />
    </div>
  );
};

export default ScheduleTable;
