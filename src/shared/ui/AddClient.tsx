import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../style/style.css';
import { FormComeMutation } from '../types/Type';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  selectBook,
  selectCreateBookLoading,
} from '../../features/shedule/model/scheduleSlice';
import {
  createBook,
  FilterBook,
  getSchedules,
  getSingleBook,
  updateTableBook,
} from '../../features/shedule/api/scheduleThunk';
import { toast } from 'react-toastify';
import { times } from '../../widgets/scheduleTable/constants/times';
import { selectTables } from '../../features/tables/model/tableSlice';

interface Props {
  filter?: FilterBook;
  onClose: () => void;
  id?: number;
}

const AddClient: React.FC<Props> = ({ onClose, id, filter }) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [form, setForm] = useState<FormComeMutation>({
    user_name: '',
    phone_number: '',
    will_come: '',
    amount_guest: '',
    start_time: '',
    time_stamp: '',
    comment: '',
    table: '',
  });

  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateBookLoading);
  const book = useAppSelector(selectBook);
  const tables = useAppSelector(selectTables);

  useEffect(() => {
    if (id) {
      dispatch(getSingleBook(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && book) {
      setForm((prevState) => ({
        ...prevState,
        ...book,
      }));
    }
  }, [book, id]);

  const changeFields = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const phoneNumberPattern = /^(\+996\d{9}|0\d{9}|\+7\d{10}|(?!0)\d{9})$/;

    if (name == 'phone_number') {
      if (value === '' || phoneNumberPattern.test(value)) {
        setForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

      setIsValid(value === '' || phoneNumberPattern.test(value));
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addClient = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(updateTableBook({ id: id!, book: form })).unwrap();
      } else {
        await dispatch(createBook(form)).unwrap();
      }
      await dispatch(getSchedules(filter)).unwrap();
      toast.success('Забронировано!');
      onClose();
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  return (
    <form
      onSubmit={addClient}
      className="flex flex-col gap-[20px] mt-[20px] text-white"
    >
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Имя клиента</p>
        <input
          onChange={changeFields}
          value={form.user_name}
          name="user_name"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          type="text"
          required
        />
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Номер столика</p>
        <select
          onChange={changeFields}
          value={form.table}
          name="table"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          required
        >
          <option value="">select</option>
          {tables.map((table) => (
            <option value={table.id}>{table.number_table}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          value={form.will_come}
          onChange={changeFields}
          type="date"
          name="will_come"
          placeholder="Дата"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black inputIcon"
          required
        />
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Номер клиента</p>
        <div className="relative">
          <input
            onChange={changeFields}
            value={form.phone_number}
            name="phone_number"
            className={`w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black ${isValid ? '' : 'border-red-500'}`}
            type="text"
            required
          />
        </div>
        {!isValid && <p style={{ color: 'red' }}>Invalid phone number</p>}
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Время нахождения</p>
        <input
          onChange={changeFields}
          name="time_stamp"
          value={form.time_stamp}
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          type="number"
          min="1"
          required
        />
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Время брони</p>
        <select
          onChange={changeFields}
          value={form.start_time}
          name="start_time"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          required
        >
          <option value="">select</option>
          {form.start_time ? (
            <option value={form.start_time}>{form.start_time}</option>
          ) : null}
          {times.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Количество гостей</p>
        <input
          onChange={changeFields}
          value={form.amount_guest}
          name="amount_guest"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          type="number"
          min="1"
          list="selectGuests"
          required
        />
        <datalist id="selectGuests">
          <option value="1">1 гость</option>
          <option value="2">2 гостей</option>
          <option value="3">3 гостей</option>
          <option value="4">4 гостей</option>
        </datalist>
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Комментарий</p>
        <input
          onChange={changeFields}
          value={form.comment}
          name="comment"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          placeholder="Напишите комментарий"
          type="text"
        />
      </div>
      <button
        type="submit"
        disabled={createLoading || !isValid}
        className="bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
      >
        {createLoading ? 'Loading' : 'Сохранить'}
      </button>
      <button
        onClick={onClose}
        type="button"
        className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
      >
        Отмена
      </button>
    </form>
  );
};

export default AddClient;
