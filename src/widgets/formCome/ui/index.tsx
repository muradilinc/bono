import { ChangeEvent, FormEvent, useState } from 'react';
import { createBook } from '../../../features/shedule/api/scheduleThunk';
import { useAppDispatch } from '../../../app/store/hooks';
import { FormComeMutation } from '../../../shared/types/Type';
import { toast } from 'react-toastify';
import Modal from '../../../shared/ui/Modal';
import { times } from '../../scheduleTable/constants/times';

export const FormCome = () => {
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
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
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
    setIsValid(false);
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
              placeholder="Имя"
              className={`bg-transparent border-b p-[10px] ${isValid && state.user_name.trim() === '' ? 'border-[red]' : 'border-white'}`}
              required
            />
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Например: 996 505 04 62 56
              </p>
              <input
                value={state.phone_number}
                onChange={changeField}
                type="number"
                min={0}
                name="phone_number"
                placeholder="Номер телефона"
                className={`w-full bg-transparent border-b p-[10px] ${isValid && state.phone_number.trim() === '' ? 'border-[red]' : 'border-white'}`}
                required
              />
            </div>
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Дата бронирования
              </p>
              <input
                value={state.will_come}
                onChange={changeField}
                type="date"
                name="will_come"
                placeholder="Дата"
                className={`bg-transparent border-b p-[10px] w-full inputIcon ${isValid && state.will_come.trim() === '' ? 'border-[red]' : 'border-white'}`}
                required
              />
            </div>
            <input
              value={state.amount_guest}
              onChange={changeField}
              type="number"
              name="amount_guest"
              placeholder="Количество персон"
              className={`bg-transparent border-b p-[10px] ${isValid && state.amount_guest.trim() === '' ? 'border-[red]' : 'border-white'}`}
              required
              min="1"
            />
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Время бронирования
              </p>
              <select
                name="start_time"
                value={state.start_time}
                onChange={changeField}
                className="bg-transparent border-b w-full p-[10px] border-white"
              >
                <option value="">select</option>
                {times.map((time) => (
                  <option value={time}>{time}</option>
                ))}
              </select>
              {/*<input*/}
              {/*  value={state.start_time}*/}
              {/*  onChange={changeField}*/}
              {/*  type="time"*/}
              {/*  name="start_time"*/}
              {/*  placeholder="Время"*/}
              {/*  className={`bg-transparent border-b w-full p-[10px] inputIcon ${isValid && state.start_time.trim() === '' ? 'border-[red]' : 'border-white'}`}*/}
              {/*  required*/}
              {/*/>*/}
            </div>
            <div>
              <p className="text-[12px] text-[#9ca3af] pl-[10px]">
                Например: 2 часа
              </p>
              <input
                value={state.time_stamp}
                onChange={changeField}
                type="number"
                name="time_stamp"
                placeholder="Длительность посещения"
                className={`bg-transparent border-b w-full p-[10px] ${isValid && state.time_stamp.trim() === '' ? 'border-[red]' : 'border-white'}`}
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
              className={`bg-transparent border-b p-[10px] ${isValid && state.comment.trim() === '' ? 'border-[red]' : 'border-white'}`}
              required
            />
          </div>
          <button
            onClick={() => setIsValid(true)}
            className="border-white border py-[10px] my-[20px]"
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
