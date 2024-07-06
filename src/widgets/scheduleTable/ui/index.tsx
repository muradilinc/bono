import { AdminHeader } from '../../AdminHeader';
import Calendar from './Calendar';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
  selectSchedules,
  selectSchedulesLoading,
} from '../../../features/shedule/model/scheduleSlice';
import { useEffect } from 'react';
import { getSchedules } from '../../../features/shedule/api/scheduleThunk';
import Loading from '../../../shared/ui/Loading';

const ScheduleTable = () => {
  const schedules = useAppSelector(selectSchedules);
  const loading = useAppSelector(selectSchedulesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-[98vw]">
      <AdminHeader />
      <Calendar slots={slots} />
    </div>
  );
};

export default ScheduleTable;
