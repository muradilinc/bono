import React, { FormEvent, useEffect, useRef, useState } from 'react';
import '../style/style.css';
import { IModalTable } from '../types/Type';
import ModalPopUp from './ModalPopUp';
import { useAppDispatch } from '../../app/store/hooks';
import { getFloors, initFloor } from '../../features/floors/api/floorThunk';

const AddFloor = ({ modalTable, setModalTable, refBg }: IModalTable) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const refModal = useRef<HTMLDivElement>(null);
  const refClose = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<{ floor: string }>({
    floor: '',
  });
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      e.target.classList.add('empty');
    } else {
      e.target.classList.remove('empty');
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const addFloor = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(initFloor(form)).unwrap();
      setForm({
        floor: '',
      });
      await dispatch(getFloors()).unwrap();
      if (refClose.current) {
        refClose.current.style.display = 'none';
        setPopUp(true);
      }
      const time = setTimeout(() => {
        setModalTable(false);
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
    if (modalTable) {
      if (refModal.current && refBg.current) {
        refModal.current.style.transform = 'translateX(0)';
        refBg.current.style.display = 'block';
      }
    } else {
      if (refModal.current && refBg.current) {
        refModal.current.style.transform = 'translateX(-100%)';
        refBg.current.style.display = 'none';
      }
    }
  }, [modalTable, refBg]);

  const onClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === refBg.current) {
      setModalTable(false);
    }
  };

  return (
    <div
      ref={refModal}
      className="fixed w-[100%] h-full flex justify-center z-[101] pt-40"
    >
      {popUp ? (
        <ModalPopUp
          popUp={popUp}
          setPopUp={setPopUp}
          propText={'Добавлен стол'}
        />
      ) : null}
      <div
        ref={refBg}
        onClick={onClickBg}
        className="fixed bg-[#00000050] left-0 right-0 bottom-0 top-0 w-full z-[99]"
      ></div>
      <div
        ref={refClose}
        className="w-[400px] h-[320px] mb-[30px] bg-black flex flex-col items-center rounded-[8px] z-[100]"
      >
        <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
          <h2 className="text-white text-[17px] font-bold">Добавить этаж</h2>
          <span
            onClick={() => setModalTable(false)}
            className="text-white text-[20px] cursor-pointer"
          >
            &#x2715;
          </span>
        </div>
        <form
          onSubmit={addFloor}
          className="flex flex-col gap-[20px] mt-[20px] text-white"
        >
          <div>
            <p className="text-[#858687] text-[14px] mb-[5px]">Номер этажа</p>
            <input
              onChange={handleInputChange}
              name="floor"
              value={form.floor}
              className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
              type="text"
              list="selectGuests"
              required
            />
            <datalist id="selectGuests">
              <option value="1й этаж">1й этаж</option>
              <option value="2й этаж">2й этаж</option>
              <option value="3й этаж">3й этаж</option>
              <option value="4й этаж">4й этаж</option>
            </datalist>
          </div>
          <button
            type="submit"
            className="bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
          >
            Добавить
          </button>
          <button
            onClick={() => setModalTable(false)}
            className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
          >
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFloor;
