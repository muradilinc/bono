import React from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { selectSchedules } from '../../features/shedule/model/scheduleSlice';

const Clients: React.FC = () => {
  const books = useAppSelector(selectSchedules);
  const filterBook = books.filter((book) => book.table === null);

  return (
    <>
      {filterBook.map((client) => (
        <div key={client.id} className="flex gap-x-3 text-white">
          <p>{client.user_name}</p>
          <p>{client.phone_number}</p>
          <p>{client.will_come}</p>
          <p>{client.start_time}</p>
          <p>{client.end_time}</p>
          <p>{client.time_stamp}</p>
        </div>
      ))}
    </>
  );
};

export default Clients;
