import { AdminHeader } from '../../AdminHeader';
import Calendar from './Calendar';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectFloors } from '../../../features/floors/model/floorSlice';
import useDebounce from '../../../features/useDebounce';
import { getSchedules } from '../../../features/shedule/api/scheduleThunk';
import dayjs from 'dayjs';
import { getTables } from '../../../features/tables/api/tablesThunk';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ScheduleTable = () => {
  const [currentDate, setCurrentDate] = useState<Value>(null);
  const [activeButton, setActiveButton] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState('');
  const floors = useAppSelector(selectFloors);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchText, 1000);

  useEffect(() => {
    if (floors.length > 0) {
      dispatch(
        getSchedules({
          date: dayjs(currentDate?.toString()).format('YYYY-MM-DD'),
          floor: floors[currentIndex].id ? floors[currentIndex].id : 0,
          status: activeButton,
          search_form: debouncedSearchTerm,
        }),
      );
    }
  }, [
    activeButton,
    currentDate,
    currentIndex,
    debouncedSearchTerm,
    dispatch,
    floors,
  ]);

  useEffect(() => {
    if (floors.length > 0) {
      dispatch(
        getTables(floors[currentIndex].id ? floors[currentIndex].id : 0),
      );
    }
  }, [currentIndex, dispatch, floors]);

  return (
    <div className="flex flex-col w-[98vw]">
      <AdminHeader
        currentDate={currentDate}
        currentStatus={activeButton}
        currentFloor={currentIndex}
        setCurrentDate={setCurrentDate}
        setCurrentText={setSearchText}
        setCurrentFloor={setCurrentIndex}
        setCurrentStatus={setActiveButton}
      />
      {floors.length > 0 ? (
        <Calendar
          filter={{
            date: dayjs(currentDate?.toString()).format('YYYY-MM-DD'),
            floor: floors[currentIndex].id ? floors[currentIndex].id : 0,
            status: activeButton,
          }}
        />
      ) : (
        <h2 className="text-white text-center text-2xl">Добавьте отделы!</h2>
      )}
    </div>
  );
};

export default ScheduleTable;
