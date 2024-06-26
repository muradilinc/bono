import React from 'react';
import moment from 'moment';
import { UsersThree } from '@phosphor-icons/react';

interface Props {
  slot: {
    id: number;
    startTime: string;
    endTime: string;
    table: number;
    occupied: boolean;
    is_come: boolean;
  };
  onOpen: () => void;
  client: (id: number) => void;
}

const TimeSlot: React.FC<Props> = ({ slot, onOpen, client }) => {
  const { startTime, endTime, occupied, is_come } = slot;
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  const duration = end.diff(start, 'minutes');
  const top = ((start.hours() * 60 + start.minutes() - 600) / 30) * 2;

  const handleClickBoor = (id: number) => {
    client(id);
    onOpen();
  };

  return (
    <div
      onClick={() => handleClickBoor(slot.id)}
      className={`absolute ${occupied ? (is_come ? 'bg-orange-700' : 'bg-green-500') : 'hidden'} rounded-[6px] flex flex-col w-full text-center`}
      style={{
        top: `${top * 2.3}rem`,
        height: `${(duration / 12.5) * 1.9}rem`,
      }}
    >
      <p>{`${startTime} - ${endTime}`}</p>
      <div className="flex items-center justify-center h-full">
        <UsersThree size={32} color="#fff" />
      </div>
    </div>
  );
};

export default TimeSlot;
