import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../style/style.css';
import { FormComeMutation } from '../types/Type';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectBook } from '../../features/shedule/model/scheduleSlice';
import { createBook } from '../../features/shedule/api/scheduleThunk';
import { toast } from 'react-toastify';
import Modal from './Modal';
import '../style/style.css';

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
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);
  const [showModal, setShowModal] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (id && book) {
      setForm((prevState) => ({
        ...prevState,
        ...book,
      }));
    }
  }, [book, id]);

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const phoneNumberPattern = /^\d{0,9}$/;
    if (name == 'phone_number') {
      if (value === '' || phoneNumberPattern.test(value)) {
        setForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      setIsValid(value.length === 9);
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createBook(form)).unwrap();
      setShowModal(true);
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  const handleCloseModal = () => {
    setForm({
      user_name: '',
      phone_number: '',
      will_come: '',
      amount_guest: '',
      start_time: '',
      time_stamp: '',
      comment: '',
    });
    setShowModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="absolute top-0 left-0 right-0 bottom-0 display flex justify-center flex-col items-center text-white bg-[#000000a6]"
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
                name="phone_number"
                placeholder="Номер телефона"
                className={`w-full bg-transparent border-b p-[10px] ${isValid ? 'border-white' : 'border-red-500'}`}
                required
              />
            </div>
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Дата бронирования
              </p>
              <input
                value={form.will_come}
                onChange={changeField}
                type="date"
                name="will_come"
                placeholder="Дата"
                className="bg-transparent border-b border-white p-[10px] w-full inputIcon"
                required
              />
            </div>
            <input
              value={form.amount_guest}
              onChange={changeField}
              type="number"
              name="amount_guest"
              placeholder="Количество персон"
              className={`bg-transparent border-b ${Number(form.amount_guest) < 1 ? 'border-red-500' : 'border-white'} p-[10px]`}
              required
              min="1"
            />
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Время бронирования
              </p>
              <input
                value={form.start_time}
                onChange={changeField}
                type="time"
                name="start_time"
                placeholder="Время"
                className="bg-transparent border-b border-white w-full p-[10px] inputIcon"
                required
              />
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
                className={`bg-transparent border-b w-full ${Number(form.time_stamp) < 1 ? 'border-red-500' : 'border-white'} p-[10px]`}
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
              required
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
      <Modal
        show={showModal}
        title={'Спасибо за ваше бронирование!'}
        onClose={handleCloseModal}
      >
        <div className="flex flex-col gap-y-3">
          <p className="font-normal text-[14px] font-comfort">
            Ваш столик успешно забронирован. Наши сотрудники свяжутся с вами в
            ближайшее время для подтверждения бронирования.
          </p>
          <ul>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Дата:</span> {form.will_come}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Время:</span> {form.start_time}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Количество гостей:</span>{' '}
              {form.amount_guest}
            </li>
          </ul>
          <p className="font-medium text-white text-[14px]">
            Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по
            телефону{' '}
            <a className="underline" href="tel:+996 505 04 62 56">
              +996 505 04 62 56
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default FormAddClient;
