import React, { ChangeEvent, FormEvent, useState } from 'react';
import { createBook } from '../../../features/shedule/api/scheduleThunk';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { FormComeMutation } from '../../../shared/types/Type';
import { toast } from 'react-toastify';
import { times } from '../../scheduleTable/constants/times';
import { X } from '@phosphor-icons/react';
import { selectCreateBookLoading } from '../../../features/shedule/model/scheduleSlice';
import { SendData } from '../../../app/axiosApi';

export const FormCome = () => {
  const [state, setState] = useState<FormComeMutation>({
    user_name: '',
    phone_number: '',
    will_come: '',
    amount_guest: '',
    start_time: '',
    time_stamp: '2',
    comment: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const loading = useAppSelector(selectCreateBookLoading);
  const dispatch = useAppDispatch();

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    const phoneNumberPattern =
      /^(\+996\d{9}|996\d{9}|0\d{9}|\+7\d{10}|(?!0)\d{9})$/;

    if (name == 'phone_number') {
      if (value === '' || phoneNumberPattern.test(value)) {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

      setIsValid(value === '' || phoneNumberPattern.test(value));
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /^[0-9+]*$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await SendData(state);
      await dispatch(createBook(state)).unwrap();
      setShowModal(true);
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

  const handleCloseModal = () => {
    setState({
      user_name: '',
      phone_number: '',
      will_come: '',
      amount_guest: '',
      start_time: '',
      time_stamp: '',
      comment: '',
    });
    setIsValid(true);
    setShowModal(false);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="display flex justify-center flex-col items-center my-[170px]"
      >
        <div
          id="reservationForm"
          className="border border-white p-12 flex flex-col gap-y-8"
        >
          <div className="text-center mb-[10px]">
            <h2 className="text-[36px] font-medium font-comfort">
              Бронь столика
            </h2>
            <p className="text-[16px] font-medium font-comfort">
              Ваш столик ждет вас – забронируйте прямо сейчас
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <input
              value={state.user_name}
              onChange={changeField}
              type="text"
              name="user_name"
              placeholder="Имя*"
              className="bg-transparent border-b p-[10px] border-white"
              required
            />
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Например: +996 505 04 62 56
              </p>
              <input
                value={state.phone_number}
                onChange={changeField}
                type="text"
                onKeyPress={handleKeyPress}
                // min={0}
                name="phone_number"
                placeholder="Номер телефона"
                className={`w-full bg-transparent border-b p-[10px] ${!isValid ? 'border-[red]' : 'border-white'}`}
                required
              />
            </div>
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Дата бронирования*
              </p>
              <input
                value={state.will_come}
                onChange={changeField}
                type="date"
                name="will_come"
                placeholder="Дата"
                className="bg-transparent border-b p-[10px] w-full inputIcon border-white"
                required
              />
            </div>
            <input
              value={state.amount_guest}
              onChange={changeField}
              type="number"
              name="amount_guest"
              placeholder="Количество персон*"
              onKeyPress={handleKeyPress}
              className="bg-transparent border-b p-[10px] border-white"
              required
              min="1"
            />
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Время бронирования*
              </p>
              <select
                name="start_time"
                value={state.start_time}
                onChange={changeField}
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
                Например: 2 (Время посещения в часах)
              </p>
              <input
                value={state.time_stamp}
                onChange={changeField}
                type="number"
                name="time_stamp"
                onKeyPress={handleKeyPress}
                placeholder="Длительность посещения*"
                className="bg-transparent border-b w-full p-[10px] border-white"
                required
                min="1"
              />
            </div>

            <input
              value={state.comment}
              onChange={changeField}
              type="text"
              name="comment"
              placeholder="Комментарий"
              className="bg-transparent border-b p-[10px] border-white"
            />
          </div>
          <button
            onClick={() => setIsValid(true)}
            disabled={loading || showModal}
            className="border-white border py-[10px] my-[20px]"
          >
            Забронировать стол
          </button>
        </div>
      </form>
      {showModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[570px] sm:w-[570px] w-[90%] bg-black flex flex-col items-center rounded-[4px] z-[100] p-[20px] border-white border-[1px]">
          <div className="flex justify-between items-center mb-[20px] w-full">
            <h2 className="font-bold text-[16px] font-sans text-white">
              Запрос на резервирование отправлен!
            </h2>
            <X
              size={24}
              onClick={handleCloseModal}
              className="cursor-pointer text-white"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <p className="font-normal text-[14px] font-sans">
              Ваш столик успешно забронирован. Наши сотрудники свяжутся с вами в
              ближайшее время для подтверждения бронирования.
            </p>
            <ul>
              <li className="font-sans text-[14px] text-white">
                <span className="text-[#C1C1C1]">Дата:</span> {state.will_come}
              </li>
              <li className="font-sans text-[14px] text-white">
                <span className="text-[#C1C1C1]">Время:</span>{' '}
                {state.start_time}
              </li>
              <li className="font-sans text-[14px] text-white">
                <span className="text-[#C1C1C1]">Количество гостей:</span>{' '}
                {state.amount_guest}
              </li>
            </ul>
            <p className="font-medium text-[14px] text-red-400 font-sans">
              {/*Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по*/}
              {/*телефону{' '}*/}
              Пожалуйста, обратите внимание, что бронь держится только в течение
              15 минут. Если ваши планы изменились, обязательно перезвоните нам.{' '}
              <a className="underline text-white" href="tel:+996 505 04 62 56">
                +996 505 04 62 56
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
