import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getFloors,
  getSingleFloor,
  initFloor,
  updateFloor,
} from '../../../../features/floors/api/floorThunk';
import { toast } from 'react-toastify';
import {
  selectFloor,
  selectFloorInitError,
  selectFloorLoading,
} from '../../../../features/floors/model/floorSlice';
import Loading from '../../../../shared/ui/Loading';
import { FloorMutation } from '../../../../features/floors/model/floors';

export const FloorForm = () => {
  const [floor, setFloor] = useState<FloorMutation>({
    title: '',
  });
  const floorApi = useAppSelector(selectFloor);
  const floorApiLoading = useAppSelector(selectFloorLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const initError = useAppSelector(selectFloorInitError);

  useEffect(() => {
    if (id) {
      dispatch(getSingleFloor(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && floorApi) {
      setFloor((prevState) => ({
        ...prevState,
        ...floorApi,
      }));
    }
  }, [floorApi, id]);

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFloor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addSubCategoryHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(updateFloor({ id: parseInt(id), title: floor.title }));
        toast.success('Отдел успешно обновлен!');
      } else {
        await dispatch(initFloor(floor)).unwrap();
        toast.success('Отдел успешно создан!');
      }
      await dispatch(getFloors()).unwrap();
      setFloor({
        title: '',
      });
      navigate(-1);
    } catch (error) {
      toast.error('Что-то пошло не так!');
      console.log(error);
    }
  };

  console.log(initError);

  if (floorApiLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={addSubCategoryHandle}>
      <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="text-white font-semibold">Добавить отдел</h1>
        <button
          type="submit"
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] w-[125px] h-[40px]"
        >
          Сохранить
        </button>
      </header>
      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px] flex flex-col gap-y-3">
        <div>
          <p className="text-[rgba(255,255,255,0.8)] text-[14px] mb-[5px]">
            Название
          </p>
          <input
            value={floor.title}
            name="title"
            onChange={changeField}
            required
            className="w-full h-[45px] rounded-[8px] px-[10px] text-white bg-[#2B2B2B]"
            placeholder="Наименование отдела"
            type="text"
          />
        </div>
      </section>
    </form>
  );
};
