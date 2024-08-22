import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSchedulesIncoming } from '../../features/shedule/model/scheduleSlice';
import {
  deleteBook,
  getSchedulesIncoming,
} from '../../features/shedule/api/scheduleThunk';
import '../style/style.css';
import { Trash } from '@phosphor-icons/react';
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';

interface Props {
  currentClient: (id: number) => void;
}

const Clients: React.FC<Props> = ({ currentClient }) => {
  const books = useAppSelector(selectSchedulesIncoming);
  const filterBook = books.filter((book) => book.table_set.length === 0);
  const dispatch = useAppDispatch();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getSchedulesIncoming());
  }, [dispatch]);

  const deleteId = (idClient: number) => {
    setId(idClient);
    setAddModal(true);
  };
  const onDelete = async () => {
    if (id) {
      await dispatch(deleteBook(id)).unwrap();
      await dispatch(getSchedulesIncoming()).unwrap();
      setAddModal(false);
      toast.success('Успешно удалено!');
    } else {
      toast.error('Что то пошло не так!');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 text-white min-w-[300px] overflow-y-scroll pr-[20px] max-h-[630px] clientScroll">
        {filterBook.length > 0 ? (
          filterBook.map((client) => (
            <div key={client.id} className="flex gap-[10px]">
              <div
                onClick={() => currentClient(client.id)}
                className="flex gap-x-3 text-white px-[15px] py-[10px] border border-white cursor-pointer flex-wrap min-w-[460px] rounded-[4px]"
              >
                <p>{client.user_name}</p>
                <p>{client.phone_number}</p>
                <p>{client.will_come}</p>
                <p>{client.start_time.slice(0, 5)}</p>
                <p>{client.end_time.slice(0, 5)}</p>
                <p>{client.time_stamp}</p>
              </div>
              <button onClick={() => deleteId(client.id)}>
                <Trash
                  className="text-white bg-[#ff0000ab] rounded-[8px] py-[5px]"
                  size={37}
                />
              </button>
            </div>
          ))
        ) : (
          <h4 className="text-center">Пусто</h4>
        )}
      </div>
      {addModal && (
        <ModalDelete
          addModal={addModal}
          setAddModal={setAddModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default Clients;
