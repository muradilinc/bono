import React, { useEffect, useRef, useState } from 'react';
import '../style/style.css';
import { IFormsAuto, IModal2 } from '../types/Type';
import ModalPopUp from './ModalPopUp';

const AddClientAuto = ({ modal2, setModal2 }: IModal2) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const refModal = useRef<HTMLDivElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const refTel = useRef<HTMLInputElement>(null);
  const refTimeA = useRef<HTMLInputElement>(null);
  const refTime = useRef<HTMLInputElement>(null);
  const refComments = useRef<HTMLInputElement>(null);
  const refGuests = useRef<HTMLInputElement>(null);
  const refTable = useRef<HTMLInputElement>(null);
  const refErr = useRef<HTMLInputElement>(null);
  const refClose = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<IFormsAuto>({
    name: '',
    tel: '',
    timeA: '',
    time: '',
    guests: '',
    comments: '',
    table: '',
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
    if (refName.current?.value.trim() === '') {
      refName.current.classList.add('empty');
    } else {
      refName.current?.classList.remove('empty');
    }
    if (refTel.current?.value.trim() === '') {
      refTel.current.classList.add('empty');
    } else {
      refTel.current?.classList.remove('empty');
    }
    if (refTimeA.current?.value.trim() === '') {
      refTimeA.current.classList.add('empty');
    } else {
      refTimeA.current?.classList.remove('empty');
    }
    if (refTime.current?.value.trim() === '') {
      refTime.current.classList.add('empty');
    } else {
      refTime.current?.classList.remove('empty');
    }
    if (refGuests.current?.value.trim() === '') {
      refGuests.current.classList.add('empty');
    } else {
      refGuests.current?.classList.remove('empty');
    }
    if (refComments.current?.value.trim() === '') {
      refComments.current.classList.add('empty');
    } else {
      refComments.current?.classList.remove('empty');
    }
    if (refTable.current?.value.trim() === '') {
      refTable.current.classList.add('empty');
    } else {
      refTable.current?.classList.remove('empty');
    }
  };

  const addClient = () => {
    if (
      Object.values(form).some((value) => value.trim() === '') &&
      refErr.current
    ) {
      refErr.current.textContent = 'Заполните все поле';
      validation();
    } else {
      if (refErr.current) {
        refErr.current.textContent = '';
      }
      setForm({
        name: '',
        tel: '',
        timeA: '',
        time: '',
        guests: '',
        comments: '',
        table: '',
      });
      if (refClose.current) {
        refClose.current.style.display = 'none';
        setPopUp(true);
      }
      const time = setTimeout(() => {
        setModal2(false);
        if (refClose.current) {
          refClose.current.style.display = 'block';
        }
      }, 3000);
      return () => clearTimeout(time);
    }
  };

  useEffect(() => {
    if (modal2) {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(0)';
      }
    } else {
      if (refModal.current) {
        refModal.current.style.transform = 'translateX(-100%)';
      }
    }
  }, [modal2]);
  return (
    <div
      ref={refModal}
      className="absolute w-[100%] flex justify-center z-[100] mt-[30px]"
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
        className="w-[400px] h-[850px] mb-[30px] bg-black flex flex-col items-center rounded-[8px]"
      >
        <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
          <h2 className="text-white text-[17px] font-bold">Добавить клиента</h2>
          <span
            onClick={() => setModal2(false)}
            className="text-white text-[20px] cursor-pointer"
          >
            &#x2715;
          </span>
        </div>
        <div className="flex flex-col gap-[20px] mt-[20px] text-white">
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">ФИО клиента</p>
            <input
              onChange={handleInputChange}
              ref={refName}
              value={form.name}
              name="name"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
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
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
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
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
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
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black inputIcon"
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
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
              type="number"
              list="selectGuests"
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
              ref={refComments}
              onChange={handleInputChange}
              value={form.comments}
              name="comments"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
              placeholder="Напишите комментарий"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">Номер стола</p>
            <input
              ref={refTable}
              onChange={handleInputChange}
              value={form.table}
              name="table"
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
              placeholder="Стол №"
              type="number"
            />
          </div>
          <p ref={refErr} className="text-[red] h-[10px]"></p>
          <button
            onClick={addClient}
            className="bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
          >
            Сохранить
          </button>
          <button
            onClick={() => setModal2(false)}
            className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientAuto;
