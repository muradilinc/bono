import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectSchedulesCommon,
  selectSchedulesCommonLoading,
} from '../../../../features/shedule/model/scheduleSlice';
import {
  deleteBook,
  getSchedulesCommon,
} from '../../../../features/shedule/api/scheduleThunk';
import Loading from '../../../../shared/ui/Loading';
import { Link } from 'react-router-dom';
import { API_LINK } from '../../../../app/constants/links';
import { Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import ModalDelete from '../../../../shared/ui/ModalDelete';

export const CommonPage = () => {
  const books = useAppSelector(selectSchedulesCommon);
  const loading = useAppSelector(selectSchedulesCommonLoading);
  const dispatch = useAppDispatch();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const deleteId = (id: number) => {
    setId(id);
    setAddModal(true);
  };
  const onDelete = async () => {
    if (id) {
      await dispatch(deleteBook(id)).unwrap();
      await dispatch(getSchedulesCommon()).unwrap();
      setAddModal(false);
      toast.success('Успешно удалено!');
    } else {
      toast.error('Что то пошло не так!');
    }
  };

  useEffect(() => {
    dispatch(getSchedulesCommon());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full h-full bg-black p-8">
        <div className="bg-black p-[16px] flex items-center justify-between">
          <h1 className="font-bold text-[20px] text-white font-comfort">
            Общее
          </h1>
          <Link
            to={API_LINK + '/book/download-booking/'}
            className="bg-[#6BC678] text-white px-[36px] py-[12px] rounded-[4px] capitalize"
          >
            скачать таблицу
          </Link>
        </div>
      </div>
      {books.length > 0 ? (
        <div className="text-white font-medium mt-[30px] overflow-y-scroll max-h-[750px] bookScroll">
          <table className="table-auto w-full text-center">
            <thead className="border-b border-white bg-black sticky top-0">
              <tr>
                <th className="pb-[10px]">№</th>
                <th className="pb-[10px]">Имя</th>
                <th className="pb-[10px]">Номер телефона</th>
                <th className="pb-[10px]">Дата и время</th>
                <th className="pb-[10px]">Длительность</th>
                <th className="pb-[10px]">Кол-во</th>
                <th className="pb-[10px]">Стол</th>
                <th className="pb-[10px]">Комментарий</th>
                <th className="pb-[10px]">Удалить</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, inx) => (
                <tr key={book.id}>
                  <td className="p-5">{inx + 1}</td>
                  <td>{book.user_name}</td>
                  <td>{book.phone_number}</td>
                  <td className="flex flex-col items-center justify-center">
                    <p>{book.will_come}</p>
                    <p>
                      {book.start_time.slice(0, 5)} -{' '}
                      {book.end_time.slice(0, 5)}
                    </p>
                  </td>
                  <td>{book.time_stamp}</td>
                  <td>{book.amount_guest} пер.</td>
                  <td className="max-w-[100px]">
                    {book.table_set.number_table}
                  </td>
                  <td className="max-w-[100px]">{book.comment}</td>
                  <td className="flex justify-center mt-[10px]">
                    <button
                      onClick={() => deleteId(book.id)}
                      className="flex items-center justify-center text-white bg-[#ff0000ab] rounded-[8px] w-[40px] h-[45px]"
                    >
                      <Trash size={32} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-white text-center mt-60">Нету данных</h4>
      )}
      {addModal && (
        <ModalDelete
          addModal={addModal}
          setAddModal={setAddModal}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
