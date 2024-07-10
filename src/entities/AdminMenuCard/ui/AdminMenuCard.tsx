import { ChangeEvent, FC, useEffect, useState } from 'react';
import { DataMenuCard } from '../model/type/types';
import ModalDelete from '../../../shared/ui/ModalDelete';
import { Check, Pen } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store/hooks';
import {
  getMenu,
  updateMenu,
} from '../../../features/AdminFilterMenu/api/MenuThunk';

export const AdminMenuCard: FC<DataMenuCard> = ({ item, onDelete }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    title: item.title,
    price: item.price,
    description: item.description || '',
  });
  useEffect(() => {
    if (modal) {
      setAddModal(true);
    }
  }, [modal, addModal]);

  const edit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };
  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveMenu = async () => {
    try {
      await dispatch(
        updateMenu({
          id: item.id,
          data: {
            ...state,
            category: item.category,
            subcategory: item.subcategory,
          },
        }),
      ).unwrap();
      await dispatch(getMenu()).unwrap();
      toast.success('Изменения сохранены!');
      setIsEdit(false);
    } catch (err) {
      toast.error('Что то пошло не так!');
    }
  };
  return (
    <div className="relative">
      <div className="w-[355px] h-[270px] rounded-[4px] text-white cursor-pointer relative overflow-hidden">
        <div onClick={() => setModal(true)} className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={`https://backend.bono-bar.com${item.image}`}
            alt="menu picture"
          />
        </div>
        {isEdit ? (
          <div className="w-full h-[81px] absolute bottom-0 bg-[#17171799] backdrop-blur-sm px-[8px] py-[8px]">
            <div className="flex justify-between text-[16px] font-bold leading-7">
              <div>
                <input
                  onChange={changeField}
                  className="bg-transparent border-b border-white max-w-[200px]"
                  type="text"
                  name="title"
                  value={state.title}
                />
              </div>
              <div className="flex gap-x-[10px]">
                <div className="font-bold text-[16px]">
                  <input
                    className="bg-transparent border-b border-white w-[50px]"
                    onChange={changeField}
                    type="text"
                    name="price"
                    value={state.price}
                  />
                </div>
                <button onClick={saveMenu}>
                  <Check size={22} />
                </button>
              </div>
            </div>
            <div className="text-[12px] font-normal leading-5 text-left pb-[15px]">
              {item?.description ? (
                <input
                  onChange={changeField}
                  className="bg-transparent border-b border-white w-full mt-[10px]"
                  type="text"
                  name="description"
                  value={state.description}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div
            onClick={() => setModal(true)}
            className="w-full h-[81px] absolute bottom-0 bg-[#17171799] backdrop-blur-sm px-[8px] py-[8px]"
          >
            <div className="flex justify-between text-[16px] font-bold leading-7">
              <div>{item.title}</div>
              <div className="flex gap-x-[10px]">
                <div className="font-bold text-[16px]">{item.price} с</div>
                <button onClick={edit}>
                  <Pen size={22} />
                </button>
              </div>
            </div>
            <div className="text-[12px] font-normal leading-5 text-left pb-[15px]">
              {item.description}
            </div>
          </div>
        )}
      </div>
      {modal && (
        <ModalDelete
          addModal={modal}
          setAddModal={setModal}
          onDelete={() => {
            onDelete(item.id);
            setModal(false);
          }}
        />
      )}
    </div>
  );
};
