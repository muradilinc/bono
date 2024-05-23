import React from 'react';
import TimeSlot from './TimeSlot';
import { Clock } from '@phosphor-icons/react';

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
    '18:30',
    '19:00',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
  ];

  return (
    <div className="relative bg-[black] h-[600px] overflow-y-scroll">
      <div className="flex">
        <div className="w-24 flex flex-col items-center">
          <div className="sticky top-0 bg-[black] z-10 flex items-center justify-center">
            <div className="bg-white z-10 flex items-center justify-center font-bold p-2">
              <Clock size={14} />
            </div>
          </div>
          <div className="bg-white p-[16px] box-border rounded-tl-[8px] rounded-bl-[8px]">
            {times.map((time) => (
              <div key={time} className="h-8 flex items-center">
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-11 gap-4">
          {tables.map((table) => (
            <div key={table} className="relative">
              <div className="sticky top-0 bg-white z-10 flex items-center justify-center font-bold mb-2">
                <span>{`№${table}`}</span>
              </div>
              <div className="relative top-[25px] bg-white h-[128rem] border-l border-gray-300">
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
    </div>
  );
};

export default Calendar;
