import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../style/style.css';
import { FormComeMutation } from '../types/Type';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  selectBook,
  selectCreateBookLoading,
  selectSchedulesCommon,
} from '../../features/shedule/model/scheduleSlice';
import { toast } from 'react-toastify';
import { times } from '../../widgets/scheduleTable/constants/times';
import { selectTables } from '../../features/tables/model/tableSlice';
import {
  getSchedules,
  getSchedulesCommon,
  getSingleBook,
  updateTableBook,
} from '../../features/shedule/api/scheduleThunk';

interface Props {
  client?: FormComeMutation | null;
  onClose: () => void;
}

const UpdateClient: React.FC<Props> = ({ client, onClose }) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [form, setForm] = useState<FormComeMutation>({
    user_name: client?.user_name || '',
    phone_number: client?.phone_number || '',
    will_come: client?.will_come || '',
    amount_guest: client?.amount_guest || '',
    start_time: client?.start_time || '',
    time_stamp: client?.time_stamp || '',
    comment: client?.comment || '',
    table: client?.table || '',
  });
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateBookLoading);
  const book = useAppSelector(selectBook);
  const tables = useAppSelector(selectTables);
  const Common = useAppSelector(selectSchedulesCommon);

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
  }, [form.phone_number]);
  useEffect(() => {
    if (client?.id) {
      dispatch(getSingleBook(client?.id));
    }
    dispatch(getSchedulesCommon());
  }, [dispatch, client?.id]);

  useEffect(() => {
    if (client?.id && book) {
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
  }, [book, client?.id]);

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
      if (client?.id) {
        await dispatch(updateTableBook({ id: client.id, book: form })).unwrap();
        await dispatch(getSchedules()).unwrap();
        toast.success('Изменено!');
        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
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
    const startTime = form.start_time;
    const hoursToAdd = Number(form.time_stamp);
    const [startHours, startMinutes] = startTime.split(':').map(Number);

    const formStartTime = new Date(0, 0, 0, startHours, startMinutes, 0);
    const formEndTime = new Date(
      formStartTime.getTime() + hoursToAdd * 60 * 60 * 1000,
    );

    const newTimeInMinutes =
      formEndTime.getHours() * 60 + formEndTime.getMinutes();
    if (newTimeInMinutes > 240 && newTimeInMinutes < 660) {
      toast.error('Время превышает 4:00 утра!!!');
      return false;
    }

    const commonTable = Common.filter((el) => el.table === Number(form.table));
    const commonWillCome = commonTable.filter(
      (el) => el.will_come === form.will_come,
    );

    const myId = client?.id;
    const foundBooking = commonWillCome.find((booking) => booking.id === myId);
    if (foundBooking) {
      return true;
    }

    for (const booking of commonWillCome) {
      const [bookingStartHours, bookingStartMinutes] = booking.start_time
        .split(':')
        .map(Number);
      const bookingStartTime = new Date(
        0,
        0,
        0,
        bookingStartHours,
        bookingStartMinutes,
        0,
      );
      const bookingEndTime = new Date(
        bookingStartTime.getTime() +
          Number(booking.time_stamp) * 60 * 60 * 1000,
      );
      const newEndTime = new Date(bookingEndTime);
      const newEndTimeHours = newEndTime.getHours();
      const newStartTime = new Date(formStartTime);
      const newStartTimeHours = newStartTime.getHours();
      if (newEndTimeHours < 4 && newStartTimeHours < 4) {
        if (newStartTimeHours < newEndTimeHours) {
          toast.warning('В это время уже есть бронирование!');
          return false;
        }
      }

      if (formStartTime < bookingEndTime && formEndTime > bookingStartTime) {
        toast.warning('В это время уже есть бронирование!');
        return false;
      }
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
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-black flex flex-col gap-[20px] rounded-[8px] z-[100] text-white p-[30px] "
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[#858687] text-[14px] mb-[5px]">Имя клиента</p>
        <input
          onChange={changeFields}
          value={form.user_name}
          name="user_name"
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          type="text"
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

export default UpdateClient;
