import { Check, Pencil, Trash } from '@phosphor-icons/react';
import { ChangeEvent, useState } from 'react';
import ModalDelete from '../../../../shared/ui/ModalDelete';
import {
  deleteTables,
  getTables,
  updateTables,
} from '../../../../features/tables/api/tablesThunk';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../../app/store/hooks';
import { TableAll } from '../../../../features/tables/model/table';
interface Props {
  item: TableAll;
}

const FloorTbody = ({ item }: Props) => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idTable, setIdTable] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    number_table: item.number_table,
    id: item.id,
  });
  const deleteId = (id: number) => {
    setIdTable(id);
    setAddModal(true);
  };
  const onDelete = async () => {
    if (idTable) {
      try {
        await dispatch(deleteTables(idTable)).unwrap();
        await dispatch(getTables()).unwrap();
        setAddModal(false);
        toast.success('Успешно удалено!');
      } catch (error) {
        toast.error('Что то пошло не так!');
      }
    }
  };
  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveTable = async () => {
    try {
      await dispatch(
        updateTables({ id: item.id, data: { ...state, floor: item.floor.id } }),
      ).unwrap();
      await dispatch(getTables()).unwrap();
      setIsEdit(false);
      toast.success('Успешно сохранено!');
    } catch (error) {
      toast.error('Ошибка при сохранении!');
    }
  };
  return (
    <>
      {isEdit ? (
        <tr key={item.id}>
          <td className="py-[20px] text-[20px] font-bold">
            <input
              min={1}
              onChange={changeField}
              className="bg-black border-b border-white text-center w-[100px]"
              value={state.number_table}
              type="number"
              name="number_table"
            />
          </td>
          <td className="py-[20px] text-[20px] font-bold">
            <button onClick={saveTable}>
              <Check size={22} />
            </button>
          </td>
          <td className="py-[20px] text-[20px] font-bold">
            <button
              onClick={() => deleteId(item.id)}
              className="bg-[#ff0000ab] rounded-[8px] p-[5px]"
            >
              <Trash size={32} />
            </button>
          </td>
        </tr>
      ) : (
        <tr key={item.id}>
          <td className="py-[20px] text-[20px] font-bold">
            {item.number_table} - стол
          </td>
          <td className="py-[20px] text-[20px] font-bold">
            <button onClick={() => setIsEdit(true)}>
              <Pencil size={24} />
            </button>
          </td>
          <td className="py-[20px] text-[20px] font-bold">
            <button
              onClick={() => deleteId(item.id)}
              className="bg-[#ff0000ab] rounded-[8px] p-[5px]"
            >
              <Trash size={32} />
            </button>
          </td>
        </tr>
      )}
      {addModal && (
        <ModalDelete
          addModal={addModal}
          setAddModal={setAddModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default FloorTbody;
