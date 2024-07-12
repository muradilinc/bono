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
    const phoneNumberPattern =
      /^(\+996\d{9}|996\d{9}|0\d{9}|\+7\d{10}|(?!0)\d{9})$/;
    if (
      form.phone_number === '' ||
      phoneNumberPattern.test(form.phone_number)
    ) {
      setIsValid(
        form.phone_number === '' || phoneNumberPattern.test(form.phone_number),
      );
    }
  }, [form]);
  useEffect(() => {
    if (id) {
      dispatch(getSingleBook(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && book) {
      let phoneNumber = book.phone_number;
      if (!phoneNumber.startsWith('+')) {
        if (phoneNumber.startsWith('996')) {
          phoneNumber = '+' + phoneNumber;
        } else if (phoneNumber.startsWith('0')) {
          phoneNumber = '+996' + phoneNumber.slice(1);
        } else {
          phoneNumber = '+996' + phoneNumber;
        }
      }
      setForm((prevState) => ({
        ...prevState,
        ...book,
        phone_number: book.phone_number,
      }));
      setIsValid(/^(\+996\d{9}|\+7\d{10})$/.test(phoneNumber));
    }
  }, [book, id]);

  const changeFields = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === 'phone_number') {
      if (!formattedValue.startsWith('+')) {
        if (formattedValue.startsWith('996')) {
          formattedValue = '+' + formattedValue;
        } else if (formattedValue.startsWith('0')) {
          formattedValue = '+996' + formattedValue.slice(1);
        } else {
          formattedValue = '+996' + formattedValue;
        }
      }
      setIsValid(/^(\+996\d{9}|\+7\d{10})$/.test(formattedValue));
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: formattedValue,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      console.log(error);
      if (error.data.validate) {
        toast.warning(error.data.validate);
      } else if (error.data.occupated) {
        toast.warning(error.data.occupated);
      } else if (error.data.end_time) {
        toast.warning(error.data.end_time, {
          className: 'w-[400px] ml-[-90px]',
        });
      } else {
        toast.error('Что-то пошло не так!');
      }
    }
  };

  const handleTimeValidation = () => {
    const [startHours, startMinutes] = form.start_time.split(':').map(Number);
    let newHours = (startHours + Number(form.time_stamp)) % 24;
    const newMinutes = startMinutes;
    if (newHours < 0) {
      newHours += 24;
    }
    const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    console.log('00:00 = ', form.start_time);
    console.log('0 h = ', form.time_stamp);
    console.log('New time = ', newTime);
    const newTimeInMinutes = newHours * 60 + newMinutes;
    const fourAMInMinutes = 4 * 60;
    if (newTimeInMinutes >= fourAMInMinutes) {
      toast.error('Время превышает 4:00 утра!!!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (handleTimeValidation()) {
      await addClient(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[20px] mt-[20px] text-white"
    >
      <div className="flex items-center justify-between gap-3">
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
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#858687] text-[14px] mb-[5px]">Номер столика</p>
        <select
          onChange={changeFields}
          value={form.table || ''}
          name="table"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          required
        >
          <option disabled value="">
            Выбрать
          </option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              {table.number_table}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#858687] text-[14px] mb-[5px]">Дата</p>
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
      <div className="flex items-center justify-between gap-3">
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
          {!isValid && (
            <p style={{ color: 'red' }}>Неправильный номер телефона</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
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
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#858687] text-[14px] mb-[5px]">Время брони</p>
        <select
          onChange={changeFields}
          value={form.start_time}
          name="start_time"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          required
        >
          {form.start_time ? (
            <option value={form.start_time}>{form.start_time}</option>
          ) : (
            <option disabled value="">
              Выбрать
            </option>
          )}
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between gap-3">
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
      <div className="flex items-center justify-between gap-3">
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
