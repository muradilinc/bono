import { FC, useEffect, useState } from 'react';
import { addDays, format, subDays } from 'date-fns';
import moment from 'moment-timezone';
import { ru } from 'date-fns/locale';

export const Calendar: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const bishkekTime = moment().tz('Asia/Bishkek').toDate();
    setCurrentDate(bishkekTime);
  }, []);

  const goToPreviousDay = () => {
    if (currentDate) {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const goToNextDay = () => {
    if (currentDate) {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  return (
    <>
      {currentDate ? (
        <>
          <div className="w-[350px] h-[47px] flex justify-center items-center bg-[#FDFDFD] rounded-[8px]">
            <button onClick={goToPreviousDay}>
              <img
                src="/admin-arrow-right.svg"
                className="rotate-180 p-3"
                alt="arrow-left"
              />
            </button>
            <div className="font-comfortaa text-2xl font-bold leading-[26.76px] text-center px-[22px] pb-[6px] m-auto">
              {format(currentDate, 'E, dd MMMM', { locale: ru })}
            </div>
            <button onClick={goToNextDay}>
              <img
                src="/admin-arrow-right.svg"
                alt="arrow-right"
                className="p-3"
              />
            </button>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </>
  );
};
