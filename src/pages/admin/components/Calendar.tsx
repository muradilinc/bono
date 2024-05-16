import React from 'react';
import TimeSlot from './TimeSlot';

interface Props {
  slots: {
    startTime: string;
    endTime: string;
    table: number;
    occupied: boolean;
  }[];
}

const Calendar: React.FC<Props> = ({ slots }) => {
  const tables = Array.from(new Set(slots.map((slot) => slot.table))).sort(
    (a, b) => a - b,
  );
  const times = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  // const getSlotStyle = (startTime: string, endTime: string) => {
  //   const start = moment(startTime, 'HH:mm');
  //   const end = moment(endTime, 'HH:mm');
  //   const top = (start.hours() - 10) * 2 + (start.minutes() / 30) * 2; // 30 минут = 2rem
  //   const height = (end.diff(start, 'minutes') / 30) * 2; // 30 минут = 2rem
  //
  //   return {
  //     top: `${top}rem`,
  //     height: `${height}rem`,
  //   };
  // };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-1">
          <div className="sticky top-0 bg-white z-10">
            {times.map((time) => (
              <div
                key={time}
                className="h-16 flex items-center justify-end pr-2"
              >
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
        {tables.map((table) => (
          <div key={table} className="col-span-1 md:col-span-1">
            <div className="sticky top-0 bg-white z-10 text-center font-bold">{`№${table}`}</div>
            <div className="relative">
              {slots
                .filter((slot) => slot.table === table)
                .map((slot) => (
                  <TimeSlot
                    key={`${slot.startTime}-${slot.table}`}
                    slot={slot}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
