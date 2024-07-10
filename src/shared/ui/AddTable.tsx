import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../style/style.css';
import { FormTable } from '../types/Type';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { getTables, initTable } from '../../features/tables/api/tablesThunk';
import { toast } from 'react-toastify';
import { selectFloors } from '../../features/floors/model/floorSlice';
import { getFloors } from '../../features/floors/api/floorThunk';

interface Props {
  onClose: () => void;
}

const AddTable: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<FormTable>({
    table: '',
    floor: '',
  });
  const floors = useAppSelector(selectFloors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFloors());
  }, [dispatch]);

  const changeFields = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTable = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(initTable(form)).unwrap();
      await dispatch(getTables(parseInt(form.floor))).unwrap();
      toast.success('Стол успешно создан!');
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Что то пошло не так!');
    }
  };

  return (
    <form
      onSubmit={addTable}
      className="w-[400px] flex flex-col items-center gap-[20px] mt-[20px] text-white"
    >
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Номер стола</p>
        <input
          onChange={changeFields}
          name="table"
          value={form.table}
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          type="text"
          required
        />
      </div>
      <div>
        <p className="text-[#858687] text-[14px] mb-[5px]">Какой этаж</p>
        <select
          name="floor"
          onChange={changeFields}
          className="w-[340px] h-[40px] px-[10px] rounded-[4px] border-2 bg-black"
          required
        >
          <option value="">Выбрать</option>
          {floors.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-[372px] bg-[#2B2B2B] duration-300 text-white h-[50px] rounded-[4px] hover:bg-[#6BC678]"
      >
        Добавить
      </button>
      <button
        onClick={onClose}
        type="button"
        className="bg-[#2B2B2B] text-white w-[372px] h-[50px] rounded-[4px] duration-300 hover:bg-[#6BC678]"
      >
        Отмена
      </button>
    </form>
  );
};

export default AddTable;
