import { useRef, useState } from 'react';
import { ICategoryPropCard } from '../Type/Type';
import { Trash } from '@phosphor-icons/react';
import ModalDelete from '../../../../shared/ui/ModalDelete';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';
import axios from 'axios';

export const AdminCategoriesCard = ({
  el,
  inx,
  handleDelete,
}: ICategoryPropCard) => {
  const refFile = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);

  const editImg = async (id: number) => {
    const file =
      refFile.current && refFile.current.files && refFile.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('name', el.name);
      formData.append('image', file);
      await axios.put(`http://3.87.95.146/category/${id}/`, formData);
      setPopUp(true);
    }
  };

  const handleDelete2 = async (id: number) => {
    handleDelete(id);
    setActive(false);
  };

  return (
    <>
      <div key={inx} className="flex items-center justify-between my-[20px]">
        <div className="flex items-center">
          <img
            className="w-[120px] h-[68px] rounded-[4px]"
            src={`${el.image ? 'http://3.87.95.146/' + el.image : 'https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'}`}
            alt="no img"
          />
          <div className="text-white ml-[15px]">
            <p>Название: {el.name}</p>
            <p>
              Дата загрузки:{' '}
              {el ? new Date(el.created_at).toLocaleDateString('ru-RU') : '...'}
            </p>
          </div>
        </div>
        <input
          onChange={() => editImg(el.id)}
          ref={refFile}
          type="file"
          style={{ display: 'none' }}
        />
        <div className="flex items-center">
          <button
            onClick={() => (refFile.current ? refFile.current.click() : null)}
            className="text-white bg-[#2B2B2B] rounded-[8px] w-[160px] h-[45px]"
          >
            Загрузить фото
          </button>
          <button
            onClick={() => setActive(true)}
            className="flex items-center justify-center text-white bg-[#ff0000ab] rounded-[8px] w-[40px] h-[45px] ml-[10px]"
          >
            <Trash size={32} />
          </button>
        </div>
      </div>
      {active ? (
        <ModalDelete
          addModal={active}
          setAddModal={setActive}
          onDelete={() => handleDelete2(el.id)}
        />
      ) : null}
      {popUp ? (
        <ModalPopUp
          popUp={popUp}
          setPopUp={setPopUp}
          propText={'Изменения сохранены'}
        />
      ) : null}
    </>
  );
};
