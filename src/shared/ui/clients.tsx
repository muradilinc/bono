import React from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { selectSchedules } from '../../features/shedule/model/scheduleSlice';

interface Props {
  currentClient: (id: number) => void;
}

const Clients: React.FC<Props> = ({ currentClient }) => {
  const books = useAppSelector(selectSchedules);
  const filterBook = books.filter((book) => book.table === null);

  return (
    <div className="flex flex-col gap-y-5 text-white min-w-[300px]">
      {filterBook.length > 0 ? (
        filterBook.map((client) => (
          <div
            key={client.id}
            onClick={() => currentClient(client.id)}
            className="flex gap-x-3 text-white px-[15px] py-[10px] border border-white cursor-pointer"
          >
            <p>{client.user_name}</p>
            <p>{client.phone_number}</p>
            <p>{client.will_come}</p>
            <p>{client.start_time}</p>
            <p>{client.end_time}</p>
            <p>{client.time_stamp}</p>
          </div>
        ))
      ) : (
        <h4 className="text-center">Пусто</h4>
      )}
    </div>
  );
};

export default Clients;
