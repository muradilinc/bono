import { Check, Pen, Trash } from '@phosphor-icons/react';
import {
  deleteBook,
  getSchedulesCommon,
  getSchedulesIncoming,
  updateBookIncoming,
  updateTableBook,
} from '../../../../features/shedule/api/scheduleThunk';
import { toast } from 'react-toastify';
import { ChangeEvent, useEffect, useState } from 'react';
import ModalDelete from '../../../../shared/ui/ModalDelete';
import { useAppDispatch } from '../../../../app/store/hooks';
import {
  Schedule,
  ScheduleIncoming,
} from '../../../../features/shedule/model/scheduleSlice';

interface Props {
  book: ScheduleIncoming;
  inx: number;
  filterBook?: Schedule[];
}

const AdminIncomingTbody = ({ book, inx, filterBook }: Props) => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState({
    id: book.id,
    user_name: book.user_name,
    phone_number: book.phone_number,
    will_come: book.will_come,
    time_stamp: book.time_stamp,
    start_time: book.start_time,
    end_time: book.end_time,
    amount_guest: book.amount_guest,
    table: book.table_set.map((item) => item.number_table),
    comment: book.comment,
    is_come: book.is_come,
    created_at: book.created_at,
  });
  useEffect(() => {
    const adjustTime = (time: string) => {
      if (time.startsWith('00:')) {
        return time.replace('00:', '24:');
      } else if (time.startsWith('01:')) {
        return time.replace('01:', '25:');
      } else if (time.startsWith('02:')) {
        return time.replace('02:', '26:');
      } else if (time.startsWith('03:')) {
        return time.replace('03:', '27:');
      } else if (time.startsWith('04:')) {
        return time.replace('04:', '28:');
      }
      return time;
    };

    const startTime = adjustTime(state.start_time);
    const endTime = adjustTime(state.end_time);

    const startHours = parseInt(startTime.split(':')[0], 10);
    const endHours = parseInt(endTime.split(':')[0], 10);

    const newTime = endHours - startHours;

    setState((prevState) => ({ ...prevState, time_stamp: String(newTime) }));
  }, [state.end_time, state.start_time]);

  const deleteId = (id: number) => {
    setId(id);
    setAddModal(true);
  };
  const onDelete = async () => {
    if (id) {
      await dispatch(deleteBook(id)).unwrap();
      if (filterBook) {
        await dispatch(getSchedulesCommon()).unwrap();
        window.location.reload();
      } else {
        await dispatch(getSchedulesIncoming()).unwrap();
      }
      toast.success('Успешно удалено!');
      setAddModal(false);
    } else {
      toast.error('Что то пошло не так!');
    }
  };
  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value === '24:00:00') {
      toast.warning('Пожалуйста, укажите 00:00 вместо 24:00.');
      setState((prevState) => ({
        ...prevState,
        [name]: '00:00:00',
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveIncoming = async () => {
    try {
      if (filterBook) {
        await dispatch(updateTableBook({ id: book.id, book: state })).unwrap();
        window.location.reload();
      } else {
        await dispatch(
          updateBookIncoming({ id: book.id, data: state }),
        ).unwrap();
        await dispatch(getSchedulesIncoming()).unwrap();
      }

      setIsEdit(false);
      toast.success('Успешно сохранено!');
    } catch (err) {
      toast.error('Ошибка при сохранении!');
    }
  };
  const calculateTimeDifference = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    let difference = end.getTime() - start.getTime();
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(difference / (1000 * 60));
    let timeDifference = '';
    if (hours > 0) {
      timeDifference = `${hours} ч`;
      if (minutes > 0) {
        timeDifference += ` ${minutes} мин`;
      }
    } else if (minutes > 0) {
      timeDifference = `${minutes} мин`;
    }
    return timeDifference;
  };
  const timeDifference = calculateTimeDifference(
    book.start_time,
    book.end_time,
  );
  return (
    <>
      {isEdit ? (
        <tr>
          <td className="p-5">
            {book.table_set.map((t) => t.number_table)
              ? book.table_set.map((t) => t.number_table).join(', ')
              : inx + 1}
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[100px]"
              onChange={changeField}
              name="user_name"
              value={state.user_name}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[120px]"
              onChange={changeField}
              name="phone_number"
              value={state.phone_number}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[100px]"
              onChange={changeField}
              name="will_come"
              value={state.will_come}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[50px]"
              onChange={changeField}
              name="start_time"
              value={state.start_time.slice(0, 5)}
              type="text"
            />
            -
            <input
              className="bg-black border-b border-white text-center w-[50px]"
              onChange={changeField}
              name="end_time"
              value={state.end_time.slice(0, 5)}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[50px]"
              onChange={changeField}
              name="amount_guest"
              value={state.amount_guest}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[150px]"
              onChange={changeField}
              name="comment"
              value={state.comment}
              type="text"
            />
          </td>
          <td>
            <button onClick={saveIncoming}>
              <Check size={22} />
            </button>
          </td>
          <td className="flex justify-center mt-[10px]">
            <button
              onClick={() => deleteId(book.id)}
              className="flex items-center justify-center text-white bg-[#ff0000ab] rounded-[8px] w-[40px] h-[45px]"
            >
              <Trash size={32} />
            </button>
          </td>
        </tr>
      ) : (
        <tr key={book.id}>
          <td className="p-5">
            {book.table_set.map((t) => t.number_table)
              ? book.table_set.map((t) => t.number_table).join(', ')
              : inx + 1}
          </td>
          <td>{book.user_name}</td>
          <td>{book.phone_number}</td>
          <td className="flex flex-col items-center justify-center">
            <p>{book.will_come}</p>
            <p>
              {book.start_time.slice(0, 5)} - {book.end_time.slice(0, 5)}
            </p>
          </td>
          <td>
            {timeDifference === '' ? state.time_stamp + ' ч' : timeDifference}
          </td>
          <td>{book.amount_guest} пер.</td>
          <td className="max-w-[100px]">{book.comment}</td>
          <td>
            <button onClick={() => setIsEdit(true)}>
              <Pen size={22} />
            </button>
          </td>
          <td className="flex justify-center mt-[10px]">
            <button
              onClick={() => deleteId(book.id)}
              className="flex items-center justify-center text-white bg-[#ff0000ab] rounded-[8px] w-[40px] h-[45px]"
            >
              <Trash size={32} />
            </button>
          </td>
        </tr>
      )}
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

export default AdminIncomingTbody;
