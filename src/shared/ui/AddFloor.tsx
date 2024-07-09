import React, { ChangeEvent, FormEvent, useState } from 'react';
import '../style/style.css';
import { useAppDispatch } from '../../app/store/hooks';
import { FormFloor } from '../types/Type';
import { getFloors, initFloor } from '../../features/floors/api/floorThunk';
import { toast } from 'react-toastify';

interface Props {
  onCLose: () => void;
}

const AddFloor: React.FC<Props> = ({ onCLose }) => {
  const [form, setForm] = useState<FormFloor>({
    title: '',
  });
  const dispatch = useAppDispatch();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addFloor = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(initFloor(form)).unwrap();
      await dispatch(getFloors()).unwrap();
      toast.success('Новый отдел создан!');
      onCLose();
    } catch (error) {
      toast.error('Что то пошло не так! ');
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={addFloor}
      className="w-[400px] h-[230px] mb-[30px] bg-black flex flex-col items-center rounded-[8px] z-[100]"
    >
      <div className="flex flex-col gap-[20px] mt-[20px] text-white">
        <div>
          <p className="text-[#858687] text-[14px] mb-[5px]">Номер этажа</p>
          <input
            onChange={changeFields}
            name="title"
            value={form.title}
            className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
            type="text"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
        >
          Добавить
        </button>
        <button
          type="button"
          onClick={onCLose}
          className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddFloor;
