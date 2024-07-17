import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import { ru } from 'date-fns/locale';
import AdminCalendar from '../../../features/AdminCalendar/ui/AdminCalendar';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  setDate: (date: Value) => void;
}

export const Calendar: React.FC<Props> = ({ setDate }) => {
  const [currentDate, setCurrentDate] = useState<Value>(null);
  const [calendar, setCalendar] = useState<boolean>(false);

  useEffect(() => {
    const bishkekTime = moment().tz('Asia/Bishkek').toDate();
    setCurrentDate(bishkekTime);
    setDate(bishkekTime);
  }, [setDate]);

  return (
    <>
      {currentDate ? (
        <>
          <div className="w-[220px] py-[5px] flex justify-center items-center bg-[#2B2B2B] rounded-[8px] text-white">
            <div
              onClick={() => setCalendar(!calendar)}
              className="font-comfortaa text-2xl font-semibold leading-[26.76px] text-center px-[22px] pb-[6px] m-auto cursor-pointer"
            >
              <h1 className="text-[16px] uppercase">
                {format(currentDate.toString(), 'EEEE', { locale: ru })}
              </h1>
              <h1 className="text-[#C1C1C1] text-[15px]">
                {format(currentDate.toString(), 'dd MMMM', { locale: ru })}
              </h1>
            </div>
            {calendar ? (
              <CaretUp
                size={26}
                className="mr-[10px]"
                onClick={() => setCalendar(!calendar)}
              />
            ) : (
              <CaretDown
                size={26}
                className="mr-[10px]"
                onClick={() => setCalendar(!calendar)}
              />
            )}
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
      {calendar ? (
        <AdminCalendar
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
          setCalendar={setCalendar}
          setFilterDate={setDate}
        />
      ) : null}
    </>
  );
};
