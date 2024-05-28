import React, { useRef, useState } from 'react';
import { ICategoryProp2Card } from './Type/Type';
import { Trash } from '@phosphor-icons/react';
import ModalDelete from '../../../shared/ui/ModalDelete';
import ModalPopUp from '../../../shared/ui/ModalPopUp';

const AdminCategoriesCard = ({
  el,
  inx,
  category,
  setCategory,
}: ICategoryProp2Card) => {
  const refFile = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);

  const editImg = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const newCategory = [...category];
      const url = URL.createObjectURL(file);
      const date = new Date().toLocaleDateString('ru-RU');
      const size = formatFileSize(file.size);
      newCategory[index] = { ...newCategory[index], url, date, size };
      setCategory(newCategory);
      setPopUp(true);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };
  const handleDelete = () => {
    const newCategory = [...category];
    newCategory.splice(inx, 1);
    setCategory(newCategory);
    setActive(false);
  };
  console.log(popUp);
  return (
    <>
      <div key={inx} className="flex items-center justify-between my-[20px]">
        <div className="flex items-center">
          <img
            className="w-[120px] h-[68px]"
            src={`${el.url ? el.url : 'https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'}`}
            alt="no img"
          />
          <div className="text-white ml-[15px]">
            <p>Дата загрузки: {el ? el.date : '...'}</p>
            <p>Объем фотографии {el ? el.size : '...'}</p>
          </div>
        </div>
        <input
          onChange={(e) => editImg(e, inx)}
          ref={refFile}
          type="file"
          style={{ display: 'none' }}
        />
        <div className="flex items-center">
          <button
            onClick={() => (refFile.current ? refFile.current.click() : null)}
            className="text-black bg-[#ECECEC] rounded-[8px] w-[160px] h-[45px]"
          >
            Загрузить фото
          </button>
          <button
            onClick={() => setActive(true)}
            className="flex items-center justify-center text-white bg-[red] rounded-[8px] w-[40px] h-[45px] ml-[10px]"
          >
            <Trash size={32} />
          </button>
        </div>
      </div>
      {active ? (
        <ModalDelete
          addModal={active}
          setAddModal={setActive}
          onDelete={handleDelete}
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

export default AdminCategoriesCard;
