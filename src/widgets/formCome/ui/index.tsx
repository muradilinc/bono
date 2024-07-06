import { ChangeEvent, FormEvent, useState } from 'react';
import { createBook } from '../../../features/shedule/api/scheduleThunk';
import { useAppDispatch } from '../../../app/store/hooks';
import { FormComeMutation } from '../../../shared/types/Type';
import { toast } from 'react-toastify';
import Modal from '../../../shared/ui/Modal';

export const FormCome = () => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const [state, setState] = useState<FormComeMutation>({
    user_name: '',
    phone_number: '',
    will_come: '',
    amount_guest: '',
    start_time: '',
    time_stamp: '',
    comment: '',
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const phoneNumberPattern = /^(\+996[1-9]\d{8}|0[1-9]\d{8}|\d{9})$/;

    if (name == 'phone_number') {
      if (value === '' || phoneNumberPattern.test(value)) {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      setIsValid(phoneNumberPattern.test(value));
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createBook(state)).unwrap();
      setShowModal(true);
    } catch (error) {
      toast.error('Что-то пошло не так!');
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
          <div className="text-center">
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
              placeholder="Имя"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <div className="relative w-full">
              <input
                value={state.phone_number}
                onChange={changeField}
                type="text"
                name="phone_number"
                placeholder="Номер телефона"
                className={`w-full bg-transparent border-b p-[10px] ${isValid ? 'border-white' : 'border-red-500'}`}
                required
              />
              <p className="pl-[10px] pt-[10px] text-[#C1C1C1] text-[14px]">
                Пример: 0559******
              </p>
            </div>
            <input
              value={state.will_come}
              onChange={changeField}
              type="date"
              name="will_come"
              placeholder="Дата"
              className="bg-transparent border-b border-white p-[10px] inputIcon"
              required
            />
            <div className="w-full">
              <input
                value={state.amount_guest}
                onChange={changeField}
                type="number"
                name="amount_guest"
                placeholder="Количество персон (только цифра)"
                className={`w-full bg-transparent border-b ${Number(state.amount_guest) < 1 ? 'border-red-500' : 'border-white'} p-[10px]`}
                required
                min="1"
              />
              <p className="pl-[10px] pt-[10px] text-[#C1C1C1] text-[14px]">
                Пример: 3
              </p>
            </div>
            <input
              value={state.start_time}
              onChange={changeField}
              type="time"
              name="start_time"
              placeholder="Время"
              className="bg-transparent border-b border-white p-[10px] inputIcon"
              required
            />
            <div className="w-full">
              <input
                value={state.time_stamp}
                onChange={changeField}
                type="number"
                name="time_stamp"
                placeholder="Длительность посещения (только цифра))"
                className={`w-full bg-transparent border-b ${Number(state.time_stamp) < 1 ? 'border-red-500' : 'border-white'} p-[10px]`}
                required
                min="1"
              />
              <p className="pl-[10px] pt-[10px] text-[#C1C1C1] text-[14px]">
                Пример: 2 (в часах)
              </p>
            </div>
            <input
              value={state.comment}
              onChange={changeField}
              type="text"
              name="comment"
              placeholder="Комментарий"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
          </div>
          <button
            disabled={!isValid}
            className="border-white border py-[10px] my-[30px]"
          >
            Забронировать стол
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
              <span className="text-[#C1C1C1]">Дата:</span> {state.will_come}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Время:</span> {state.start_time}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Количество гостей:</span>{' '}
              {state.amount_guest}
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
    </div>
  );
};
