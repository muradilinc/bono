import React, { useRef, useState } from 'react';
import { ICategory, ICategoryProp } from '../Type/Type';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';

export const AdminAddCategories = ({
  setCategory,
  setActiveBtn,
}: ICategoryProp) => {
  const refFile = useRef<HTMLInputElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ICategory | null>(null);
  const [popUp, setPopUp] = useState<boolean>(false);

  const AddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = URL.createObjectURL(file);
      const date = new Date().toLocaleDateString('ru-RU');
      const size = formatFileSize(file.size);
      const name = refName.current && refName.current.value;
      const newData = {
        url: url,
        date: date,
        size: size,
        name: name,
      };
      setData(newData);
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
  const addCatalog = () => {
    if (
      !refFile.current ||
      !refFile.current.files ||
      !refFile.current.files[0] ||
      (refName.current && refName.current.value.trim() === '')
    ) {
      alert('Пожалуйста,заполните все поле');
      validName();
    } else {
      setPopUp(true);
      const time = setTimeout(() => {
        if (data && refName.current) {
          setCategory((prevData) => [...prevData, data]);
          refName.current.value = '';
          setData(null);
          setActiveBtn('Категории');
        }
      }, 3000);
      return () => clearTimeout(time);
    }
  };
  const validName = () => {
    if (refName.current && refName.current.value.trim() === '') {
      return (refName.current.style.border = '2px solid red');
    } else {
      if (refName.current) {
        return (refName.current.style.border = '1px solid #ccc');
      }
    }
  };

  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-[#E6F3FF] px-[20px]">
        <h1 className="text-[rgba(0,0,0,0.6)] font-semibold">
          Добавить категорию
        </h1>
        <button
          onClick={addCatalog}
          className="font-semibold text-white bg-[rgba(87,128,235,1)] rounded-[8px] w-[125px] h-[40px]"
        >
          Сохранить
        </button>
      </header>
      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <p className="text-[rgba(255,255,255,0.8)] text-[14px] mb-[5px]">
          Название
        </p>
        <input
          onInput={validName}
          ref={refName}
          className="w-full h-[45px] rounded-[8px] px-[10px]"
          placeholder="Наименование блюдо"
          id="nameFood"
          type="text"
        />

        <div className="flex items-center justify-between mt-[30px]">
          <div className="flex items-center">
            <img
              className="w-[120px] h-[68px]"
              src={`${data ? data.url : 'https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'}`}
              alt="no img"
            />
            <div className="text-white ml-[15px]">
              <p>Дата загрузки: {data ? data.date : '...'}</p>
              <p>Объем фотографии {data ? data.size : '...'}</p>
            </div>
          </div>
          <input
            onChange={AddImg}
            ref={refFile}
            type="file"
            style={{ display: 'none' }}
          />
          <button
            onClick={() => (refFile.current ? refFile.current.click() : null)}
            className="text-black bg-[#ECECEC] rounded-[8px] w-[160px] h-[45px]"
          >
            Загрузить фото
          </button>
        </div>
      </section>
      {popUp ? (
        <ModalPopUp popUp={popUp} setPopUp={setPopUp} propText={'Добавлен'} />
      ) : null}
    </>
  );
};
