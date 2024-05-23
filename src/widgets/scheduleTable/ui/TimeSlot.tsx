import React from 'react';
import moment from 'moment';
// import { UsersThree } from '@phosphor-icons/react';

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
  const duration = end.diff(start, 'minutes') / 30;
  const top = ((start.hours() - 10) * 2 + start.minutes() / 30) * 2;

  return (
    <div
      className={`absolute ${occupied ? 'bg-green-500' : 'bg-white'} border border-black text-center`}
      style={{ top: `${top}rem`, height: `${duration * 2}rem` }}
    >
      <p>{`${startTime} - ${endTime}`}</p>
    </div>
  );
};

export default TimeSlot;
