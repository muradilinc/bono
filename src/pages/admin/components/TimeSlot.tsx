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
  const duration =
    moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes') / 30;

  return (
    <div
      className={`absolute left-0 right-0 ${occupied ? 'bg-green-500' : 'bg-white'} border border-black text-center`}
      style={{
        top: `${(moment(startTime, 'HH:mm').hours() - 10) * 2 + (moment(startTime, 'HH:mm').minutes() / 30) * 2}rem`,
        height: `${duration * 2}rem`,
      }}
    >
      <p>{`${startTime} - ${endTime}`}</p>
    </div>
  );
};

export default TimeSlot;
