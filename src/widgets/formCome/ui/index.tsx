import { ChangeEvent, FormEvent, useState } from 'react';
import { createBook } from '../../../features/shedule/api/scheduleThunk';
import { useAppDispatch } from '../../../app/store/hooks';
import { FormComeMutation } from '../../../shared/types/Type';
import { toast } from 'react-toastify';
import Modal from '../../../shared/ui/Modal';

export const FormCome = () => {
  const [state, setState] = useState<FormComeMutation>({
    name: '',
    phone: '',
    date: '',
    countPerson: '',
    time: '',
    timeSpend: '',
    comment: '',
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'phone') {
      setState((prevState) => ({
        ...prevState,
        phone: value.toString(),
      }));
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
      name: '',
      phone: '',
      date: '',
      countPerson: '',
      time: '',
      timeSpend: '',
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
              value={state.name}
              onChange={changeField}
              type="text"
              name="name"
              placeholder="Имя"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <input
              value={state.phone}
              onChange={changeField}
              type="number"
              name="phone"
              placeholder="Номер телефона"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <input
              value={state.date}
              onChange={changeField}
              type="date"
              name="date"
              placeholder="Дата"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <input
              value={state.countPerson}
              onChange={changeField}
              type="number"
              name="countPerson"
              placeholder="Количество персон"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <input
              value={state.time}
              onChange={changeField}
              type="time"
              name="time"
              placeholder="Время"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
            <input
              value={state.timeSpend}
              onChange={changeField}
              type="number"
              name="timeSpend"
              placeholder="Длительность посещения"
              className="bg-transparent border-b border-white p-[10px]"
              required
            />
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
          <button className="border-white border py-[10px] my-[30px]">
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
              <span className="text-[#C1C1C1]">Дата:</span> {state.date}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Время:</span> {state.time}
            </li>
            <li className="font-medium text-[14px] text-white">
              <span className="text-[#C1C1C1]">Количество гостей:</span>{' '}
              {state.countPerson}
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
