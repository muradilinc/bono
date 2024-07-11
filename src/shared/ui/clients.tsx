import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSchedulesIncoming } from '../../features/shedule/model/scheduleSlice';
import { getSchedulesIncoming } from '../../features/shedule/api/scheduleThunk';
import '../style/style.css';

interface Props {
  currentClient: (id: number) => void;
}

const Clients: React.FC<Props> = ({ currentClient }) => {
  const books = useAppSelector(selectSchedulesIncoming);
  const filterBook = books.filter((book) => book.table === null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchedulesIncoming());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-5 text-white min-w-[300px] overflow-y-scroll pr-[20px] max-h-[630px] clientScroll">
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
