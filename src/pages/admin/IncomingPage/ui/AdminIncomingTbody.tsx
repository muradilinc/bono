import { Check, Pen, Trash } from '@phosphor-icons/react';
import {
  deleteBook,
  getSchedules,
  updateBookIncoming,
} from '../../../../features/shedule/api/scheduleThunk';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import ModalDelete from '../../../../shared/ui/ModalDelete';
import { useAppDispatch } from '../../../../app/store/hooks';
import { AdminIncomingType } from '../../../../shared/types/Type';

interface Props {
  book: AdminIncomingType;
  inx: number;
}

const AdminIncomingTbody = ({ book, inx }: Props) => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<AdminIncomingType>({
    id: book.id,
    user_name: book.user_name,
    phone_number: book.phone_number,
    will_come: book.will_come,
    time_stamp: book.time_stamp,
    start_time: book.start_time,
    end_time: book.end_time,
    amount_guest: book.amount_guest,
    table: book.table,
    comment: book.comment,
    is_come: book.is_come,
  });

  const deleteId = (id: number) => {
    setId(id);
    setAddModal(true);
  };
  const onDelete = async () => {
    if (id) {
      await dispatch(deleteBook(id)).unwrap();
      await dispatch(getSchedules()).unwrap();
      setAddModal(false);
      toast.success('Успешно удалено!');
    } else {
      toast.error('Что то пошло не так!');
    }
  };
  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveIncoming = async () => {
    try {
      await dispatch(updateBookIncoming({ id: book.id, data: state })).unwrap();
      await dispatch(getSchedules()).unwrap();
      setIsEdit(false);
      toast.success('Успешно сохранено!');
    } catch (err) {
      toast.error('Ошибка при сохранении!');
    }
  };

  return (
    <>
      {isEdit ? (
        <tr>
          <td className="p-5">{inx + 1}</td>
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
          <td className="flex flex-col items-center">
            <input
              className="bg-black text-center w-[100px]"
              onChange={changeField}
              name="will_come"
              value={state.will_come}
              type="text"
            />
            <input
              className="bg-black border-b border-white text-center w-[100px]"
              onChange={changeField}
              name="time_stamp"
              value={state.time_stamp}
              type="text"
            />
          </td>
          <td>
            <input
              className="bg-black border-b border-white text-center w-[50px]"
              onChange={changeField}
              name="start_time"
              value={state.start_time}
              type="text"
            />
            -
            <input
              className="bg-black border-b border-white text-center w-[50px]"
              onChange={changeField}
              name="end_time"
              value={state.end_time}
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
          <td className="p-5">{inx + 1}</td>
          <td>{book.user_name}</td>
          <td>{book.phone_number}</td>
          <td className="flex flex-col items-center justify-center">
            <p>{book.will_come}</p>
            <p>{book.start_time}</p>
          </td>
          <td>{book.time_stamp}</td>
          <td>{book.amount_guest}</td>
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
