import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../style/style.css';
import { FormComeMutation } from '../types/Type';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectBook } from '../../features/shedule/model/scheduleSlice';
import {
  createBook,
  getSchedulesIncoming,
} from '../../features/shedule/api/scheduleThunk';
import { toast } from 'react-toastify';
import '../style/style.css';
import { CalendarDots } from '@phosphor-icons/react';
import { times } from '../../widgets/scheduleTable/constants/times';
import { SendData } from '../../app/axiosApi';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onClose: () => void;
  id?: number;
}

const FormAddClient: React.FC<Props> = ({ onClose, id }) => {
  const [form, setForm] = useState<FormComeMutation>({
    user_name: '',
    phone_number: '',
    will_come: '',
    amount_guest: '',
    start_time: '',
    time_stamp: '',
    comment: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const datepickerRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);

  useEffect(() => {
    if (id && book) {
      setForm((prevState) => ({
        ...prevState,
        ...book,
      }));
    }
  }, [book, id]);

  useEffect(() => {
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date();
    setForm((prevState) => ({
      ...prevState,
      will_come: today.toISOString().split('T')[0],
    }));
    setSelectedDate(today);
  }, []);

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setForm((prevState) => ({
        ...prevState,
        will_come: date.toISOString().split('T')[0],
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await SendData(form);
      await dispatch(createBook(form)).unwrap();
      await dispatch(getSchedulesIncoming()).unwrap();
      toast.success('Добавлен!');
      setForm({
        user_name: '',
        phone_number: '',
        will_come: '',
        amount_guest: '',
        start_time: '',
        time_stamp: '',
        comment: '',
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      if (error.data.end_time) {
        toast.warning('Время бронирования должно быть между 10:00 и 04:00.', {
          className: 'w-[400px] ml-[-90px]',
        });
      } else {
        toast.error('Что-то пошло не так!');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed top-0 left-0 right-0 bottom-0 display flex justify-center flex-col items-center text-white bg-[#000000a6]"
    >
      <div
        id="reservationForm"
        className="border border-white p-12 flex flex-col w-[500px] bg-black"
      >
        <div className="text-center mb-[10px]">
          <h2 className="text-[24px] font-medium font-comfort">
            Добавить клиента
          </h2>
        </div>
        <div className="flex flex-col gap-y-4">
          <input
            value={form.user_name}
            onChange={changeField}
            type="text"
            name="user_name"
            placeholder="Имя"
            className="bg-transparent border-b border-white p-[10px]"
            required
          />
          <div>
            <p className="text-[12px] text-[#9ca3af] pl-[10px]">
              Например: 996 505 04 62 56
            </p>
            <input
              value={form.phone_number}
              onChange={changeField}
              type="text"
              min={0}
              name="phone_number"
              placeholder="Номер телефона"
              className={`w-full bg-transparent border-b p-[10px] border-white`}
              required
            />
          </div>
          <div className="relative">
            <p className="text-[12px] text-[#9ca3af] pl-[10px]">
              Дата бронирования
            </p>
            <label className="relative cursor-pointer border-white border-b block w-full">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="bg-transparent p-[10px] w-full cursor-pointer outline-none"
              />
              <CalendarDots
                size={24}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              />
            </label>
          </div>
          <input
            value={form.amount_guest}
            onChange={changeField}
            type="number"
            name="amount_guest"
            placeholder="Количество персон"
            className={`bg-transparent border-b border-white p-[10px]`}
            required
            min="1"
          />
          <div>
            <p className="text-[12px] text-[#9ca3af] pl-[10px]">
              Время бронирования
            </p>
            <select
              name="start_time"
              value={form.start_time}
              onChange={changeField}
              required
              className="bg-transparent border-b w-full p-[10px] border-white"
            >
              <option className="bg-black" disabled value="">
                Выбрать
              </option>
              {times.map((time, inx) => (
                <option key={inx} className="bg-black" value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[12px] text-[#9ca3af] pl-[10px]">
              Например: 2 часа
            </p>
            <input
              value={form.time_stamp}
              onChange={changeField}
              type="number"
              name="time_stamp"
              placeholder="Длительность посещения"
              className={`bg-transparent border-b w-full border-white p-[10px]`}
              required
              min="1"
            />
          </div>

          <input
            value={form.comment}
            onChange={changeField}
            type="text"
            name="comment"
            placeholder="Комментарий"
            className="bg-transparent border-b border-white p-[10px]"
          />
        </div>
        <button className="border-white border py-[10px] my-[20px]">
          Добавить
        </button>
        <button
          onClick={onClose}
          type="button"
          className="border-white border py-[10px]"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default FormAddClient;
