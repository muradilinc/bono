import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectFloors } from '../../../../features/floors/model/floorSlice';
import {
  deleteFloor,
  getFloors,
} from '../../../../features/floors/api/floorThunk';
import { Link } from 'react-router-dom';
import { Pencil, Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

export const FloorPanel = () => {
  const floors = useAppSelector(selectFloors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFloors());
  }, [dispatch]);

  const handleDeleteFloor = async (id: number) => {
    try {
      await dispatch(deleteFloor(id)).unwrap();
      await dispatch(getFloors()).unwrap();
      toast.success('Отдел успешно удален!');
    } catch (error) {
      console.log(error);
      toast.error('Что-то пошло не так!');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="text-white font-semibold">Отделы</h1>
        <Link
          to="/admin/department-submit"
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] py-[10px] px-[15px]"
        >
          + Добавить
        </Link>
      </header>

      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <div>
          {floors.length > 0 ? (
            floors.map((floor) => (
              <div
                key={floor.id}
                className="flex items-center justify-between my-[20px]"
              >
                <div className="flex items-center">
                  <div className="text-white ml-[15px]">
                    <div className="flex items-center gap-x-3">
                      <p>Название: {floor.title}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <Link
                    className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                    to={`/admin/department-submit/${floor.id}`}
                  >
                    <Pencil size={24} />
                  </Link>
                  <button
                    onClick={() => handleDeleteFloor(floor.id)}
                    className="text-white bg-red-500 py-[5px] px-[10px] rounded-[5px]"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Пусто</p>
          )}
        </div>
      </section>
    </>
  );
};