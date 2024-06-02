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
    '30',
    '11:00',
    '30',
    '12:00',
    '30',
    '13:00',
    '30',
    '14:00',
    '30',
    '15:00',
    '30',
    '16:00',
    '30',
    '17:00',
    '30',
    '18:00',
    '30',
    '19:00',
    '30',
    '20:00',
    '30',
    '21:00',
    '30',
    '22:00',
    '30',
    '23:00',
    '30',
    '00:00',
    '30',
    '01:00',
    '30',
    '02:00',
  ];

  return (
    <div className="bg-[black]">
      <div className="ml-[20px] bg-[#2B2B2B] px-[10px] rounded-[4px]">
        <div className="flex flex-col">
          <div className="flex py-[8px] items-center">
            <h4 className="font-comfort text-white font-medium text-[14px] pr-[24px]">
              Столы/ время
            </h4>
            {tables.map((table) => (
              <div
                key={table}
                className="min-w-[124px] w-full border-l border-gray-300 text-white z-10 flex items-center justify-center text-[18px] font-comfort font-medium"
              >
                <span>{`№${table}`}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex gap-y-[35px] flex-col pr-[24px]">
              {times.map((time, index) => (
                <div
                  key={index}
                  className="items-center text-white font-comfort font-medium text-[24px]"
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <div className="relative flex">
              {tables.map((table) => (
                <div key={table} className="min-w-[124px] relative">
                  {slots
                    .filter((slot) => slot.table === table)
                    .map((slot) => (
                      <TimeSlot
                        key={`${slot.startTime}-${slot.table}`}
                        slot={slot}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
