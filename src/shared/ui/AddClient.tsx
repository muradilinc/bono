import React, { FormEvent, useEffect, useRef, useState } from 'react';
import '../style/style.css';
import { FormComeMutation, IModal } from '../types/Type';
import ModalPopUp from './ModalPopUp';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  createBook,
  getSchedules,
} from '../../features/shedule/api/scheduleThunk';
import { selectCreateBookLoading } from '../../features/shedule/model/scheduleSlice';

const AddClient = ({ modal, setModal }: IModal) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const refModal = useRef<HTMLDivElement>(null);
  const refBg = useRef<HTMLDivElement>(null);
  const refClose = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormComeMutation>({
    name: '',
    phone: '',
    date: '',
    time: '',
    timeSpend: '',
    countPerson: '',
    comment: '',
    table: '',
  });
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateBookLoading);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      e.target.classList.add('empty');
    } else {
      e.target.classList.remove('empty');
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const addClient = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const updatedForm = { ...form };
      await dispatch(createBook(updatedForm)).unwrap();
      await dispatch(getSchedules()).unwrap();
      setForm({
        name: '',
        phone: '',
        date: '',
        time: '',
        timeSpend: '',
        countPerson: '',
        comment: '',
        table: '',
      });
      if (refClose.current) {
        refClose.current.style.display = 'none';
        setPopUp(true);
      }
      const time = setTimeout(() => {
        setModal(false);
        if (refClose.current) {
          refClose.current.style.display = 'block';
        }
      }, 3000);
      return () => clearTimeout(time);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (modal) {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(0)';
      }
    } else {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(-100%)';
      }
    }
  }, [modal]);
  const onClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === refBg.current) {
      setModal(false);
    }
  };

  return (
    <>
      <div
        ref={refBg}
        onClick={onClickBg}
        className="fixed bg-[#00000050] left-0 right-0 bottom-0 top-0 w-full h-full z-[99]"
      ></div>
      <div
        ref={refModal}
        className="absolute top-0 w-[100%] flex justify-center z-[101] mt-[10px]"
      >
        {popUp ? (
          <ModalPopUp
            popUp={popUp}
            setPopUp={setPopUp}
            propText={'Добавлен клиент'}
          />
        ) : null}
        <div
          ref={refClose}
          className="w-[400px] py-5 mb-[30px] bg-black flex flex-col items-center rounded-[8px] z-[100]"
        >
          <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
            <h2 className="text-white text-[17px] font-bold">
              Добавить клиента
            </h2>
            <span
              onClick={() => setModal(false)}
              className="text-white text-[20px] cursor-pointer"
            >
              &#x2715;
            </span>
          </div>
          <form
            onSubmit={addClient}
            className="flex flex-col mt-[20px] text-white"
          >
            <div>
              <p className="text-[#858687] text-[14px] mb-[5px]">Имя клиента</p>
              <input
                onChange={handleInputChange}
                value={form.name}
                name="name"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                type="text"
                required
              />
            </div>
            <div className="my-[10px]">
              <p className="text-[#858687] text-[14px] mb-[5px]">
                Номер столика
              </p>
              <input
                onChange={handleInputChange}
                value={form.table}
                name="table"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                type="text"
                required
              />
            </div>
            <div>
              <p className="text-[#858687] text-[14px] mb-[5px]">
                Номер клиента
              </p>
              <input
                onChange={handleInputChange}
                value={form.phone}
                name="phone"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                type="number"
                required
              />
            </div>
            <div className="my-[10px]">
              <p className="text-[#858687] text-[14px] mb-[5px]">
                Время нахождения
              </p>
              <input
                onChange={handleInputChange}
                name="timeSpend"
                value={form.timeSpend}
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                type="text"
                list="select"
                required
              />
              <datalist id="select">
                <option value="1 час">1 час</option>
                <option value="2 часа">2 часа</option>
                <option value="3 часа">3 часа</option>
              </datalist>
            </div>
            <div>
              <p className="text-[#858687] text-[14px] mb-[5px]">Время брони</p>
              <input
                onChange={handleInputChange}
                value={form.time}
                name="time"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black inputIcon"
                type="time"
                required
              />
            </div>
            <div className="my-[10px]">
              <p className="text-[#858687] text-[14px] mb-[5px]">
                Количество гостей
              </p>
              <input
                onChange={handleInputChange}
                value={form.countPerson}
                name="countPerson"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                type="number"
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
                onChange={handleInputChange}
                value={form.comment}
                name="comment"
                className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
                placeholder="Напишите комментарий"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-[20px] mt-[20px]">
              <button
                type="submit"
                disabled={createLoading}
                className="bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
              >
                {createLoading ? 'Loading' : 'Сохранить'}
              </button>
              <button
                onClick={() => setModal(false)}
                className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClient;
