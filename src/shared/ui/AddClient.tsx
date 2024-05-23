import React, { useEffect, useRef, useState } from 'react';
import '../style/style.css';
import { IForms, IModal } from '../types/Type';

const AddClient = ({ modal, setModal }: IModal) => {
  const refModal = useRef<HTMLDivElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const refTel = useRef<HTMLInputElement>(null);
  const refTimeA = useRef<HTMLInputElement>(null);
  const refTime = useRef<HTMLInputElement>(null);
  const refComments = useRef<HTMLInputElement>(null);
  const refGuests = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<IForms>({
    name: '',
    tel: '',
    timeA: '',
    time: '',
    guests: '',
    comments: '',
  });

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

  const validation = () => {
    if (refName.current?.value === '') {
      refName.current.classList.add('empty');
    } else {
      refName.current?.classList.remove('empty');
    }
    if (refTel.current?.value === '') {
      refTel.current.classList.add('empty');
    } else {
      refTel.current?.classList.remove('empty');
    }
    if (refTimeA.current?.value === '') {
      refTimeA.current.classList.add('empty');
    } else {
      refTimeA.current?.classList.remove('empty');
    }
    if (refTime.current?.value === '') {
      refTime.current.classList.add('empty');
    } else {
      refTime.current?.classList.remove('empty');
    }
    if (refGuests.current?.value === '') {
      refGuests.current.classList.add('empty');
    } else {
      refGuests.current?.classList.remove('empty');
    }
    if (refComments.current?.value === '') {
      refComments.current.classList.add('empty');
    } else {
      refComments.current?.classList.remove('empty');
    }
  };

  const addClient = () => {
    if (Object.values(form).some((value) => value === '')) {
      alert('Заполните все поле');
      validation();
    } else {
      alert('Добавлен');
      console.log(form);
      setForm({
        name: '',
        tel: '',
        timeA: '',
        time: '',
        guests: '',
        comments: '',
      });
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
  return (
    <div
      ref={refModal}
      className="absolute w-[100%] flex justify-center z-[100] mt-[30px]"
    >
      <div className="w-[400px] h-[730px] bg-white flex flex-col items-center rounded-[8px]">
        <div className="flex items-center justify-between bg-[#F4FAFF] py-[15px] px-[15px] w-[100%] rounded-[8px]">
          <h2 className="text-[rgba(0,0,0,0.6)] text-[17px] font-bold">
            Добавить клиента
          </h2>
          <span
            onClick={() => setModal(false)}
            className="text-[rgba(0,0,0,0.6)] text-[20px] cursor-pointer"
          >
            &#x2715;
          </span>
        </div>
        <div className="flex flex-col gap-[20px] mt-[20px]">
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">ФИО клиента</p>
            <input
              onChange={handleInputChange}
              ref={refName}
              value={form.name}
              name="name"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">Номер клиента</p>
            <input
              ref={refTel}
              onChange={handleInputChange}
              value={form.tel}
              name="tel"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              type="number"
            />
          </div>
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">
              Время нахождения
            </p>
            <input
              ref={refTimeA}
              onChange={handleInputChange}
              name="timeA"
              value={form.timeA}
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              type="text"
              list="select"
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
              ref={refTime}
              onChange={handleInputChange}
              value={form.time}
              name="time"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              type="time"
            />
          </div>
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">
              Количество гостей
            </p>
            <input
              ref={refGuests}
              onChange={handleInputChange}
              value={form.guests}
              name="guests"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              type="number"
            />
          </div>
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">Комментарий</p>
            <input
              ref={refComments}
              onChange={handleInputChange}
              value={form.comments}
              name="comments"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2"
              placeholder="Напишите комментарий"
              type="text"
            />
          </div>
          <button
            onClick={addClient}
            className="bg-[#F8F8F8] duration-300 text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] hover:bg-[rgba(87,128,235,1)] hover:text-white"
          >
            Сохранить
          </button>
          <button
            onClick={() => setModal(false)}
            className="bg-[#F8F8F8] text-[rgba(0,0,0,0.6)] h-[50px] rounded-[4px] duration-300 hover:bg-[rgba(87,128,235,1)] hover:text-white"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
