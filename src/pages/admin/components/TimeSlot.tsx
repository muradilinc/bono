import React from 'react';
import moment from 'moment';

interface Props {
  slot: {
    startTime: string;
    endTime: string;
    table: number;
    occupied: boolean;
  };
}

const TimeSlot: React.FC<Props> = ({ slot }) => {
  const { startTime, endTime, occupied } = slot;
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  const top = ((start.hours() - 10) * 2 + start.minutes() / 30) * 2; // 30 минут = 2rem
  const height = (end.diff(start, 'minutes') / 30) * 2; // 30 минут = 2rem

  return (
    <div
      className={`absolute left-0 right-0 ${occupied ? 'bg-green-500' : 'bg-gray-200'} border border-black text-center`}
      style={{ top: `${top}rem`, height: `${height}rem` }}
    >
      <p>{`${startTime} - ${endTime}`}</p>
    </div>
  );
};

export default TimeSlot;
