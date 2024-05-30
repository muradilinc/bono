import { ChangeEvent, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { MenuItemMutation } from '../model/types';
import { FILTER_DATA } from '../../../../features/AdminFilterMenu/model/constants/constant';

export const MenuFormPage = () => {
  const [state, setState] = useState<MenuItemMutation>({
    title: '',
    price: '',
    gram: '',
    image: null,
    description: '',
    category_id: '',
  });
  const [imageData, setImageData] = useState('');
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const changeFiled = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const changeImageFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      setFilename(files[0].name);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="w-full h-screen bg-black">
      <form>
        <div className="w-full py-[10px] bg-[#E6F3FF] border-l border-opacity-0">
          <div className="container mx-auto flex flex-row justify-between  items-center">
            <h2>Добавить меню</h2>
            <button
              type="submit"
              className="font-medium text-[16px] text-white bg-[rgba(87,128,235,1)] rounded-[8px] px-[10px] py-[10px]"
            >
              Добавить
            </button>
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-y-3 mt-[30px]">
          <div>
            <label
              className="text-white text-[12px] font-medium"
              htmlFor="title"
            >
              Название
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full outline-0 bg-white px-[24px] py-[10px] rounded-[8px] placeholder:text-[#000]/70 placeholder:font-normal placeholder:text-[16px]"
              placeholder="Наименование блюдо"
              value={state.title}
              onChange={changeFiled}
            />
          </div>
          <div>
            <label
              className="text-white text-[12px] font-medium"
              htmlFor="category"
            >
              Категория
            </label>
            <select
              name="category_id"
              id="category"
              required
              value={state.category_id}
              onChange={changeFiled}
              className="w-full py-[10px] bg-white outline-0 rounded-[8px]"
            >
              <option value=""></option>
              {FILTER_DATA.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between gap-x-[10px]">
            <div className="w-full">
              <label
                className="text-white text-[12px] font-medium"
                htmlFor="price"
              >
                Цена
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                placeholder="Введите цену"
                className="w-full bg-white outline-0 px-[24px] py-[10px] rounded-[8px] placeholder:text-[#000]/70 placeholder:font-normal placeholder:text-[16px]"
                value={state.price}
                onChange={changeFiled}
              />
            </div>
            <div className="w-full">
              <label
                className="text-white text-[12px] font-medium"
                htmlFor="gram"
              >
                Грамм
              </label>
              <input
                id="gram"
                type="text"
                name="gram"
                required
                placeholder="Информация о весе"
                className="w-full bg-white outline-0 px-[24px] py-[10px] rounded-[8px] placeholder:text-[#000]/70 placeholder:font-normal placeholder:text-[16px]"
                value={state.gram}
                onChange={changeFiled}
              />
            </div>
          </div>
          <div>
            <input
              type="file"
              name="image"
              required
              ref={imageSelect}
              onChange={changeImageFiled}
              className="hidden"
            />
            {filename.length !== 0 ? (
              <div className="flex gap-x-3 justify-between items-center">
                <div className="flex items-center gap-x-[18px]">
                  <img
                    className="max-w-[120px] max-h-[68px]"
                    src={imageData}
                    alt="file"
                  />
                  <div>
                    <p className="text-white text-[16px] font-normal">
                      Дата загрузки:{' '}
                      {dayjs(state.image?.lastModified).format('DD.MM.YYYY')}
                    </p>
                    <p className="text-white text-[16px] font-normal">
                      Объем фотографии:{' '}
                      {filesize(state.image?.size || 2, { standard: 'jedec' })}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-white text-[#000]/70 rounded-[8px] py-[10px] px-[13px]"
                  onClick={selectImage}
                  type="button"
                >
                  Загрузить фото
                </button>
              </div>
            ) : (
              <button
                onClick={selectImage}
                type="button"
                className="text-white h-[68px] w-full border-dashed border-white font-semibold py-2 px-4 border rounded"
              >
                Фото
              </button>
            )}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Описаниe"
              rows={7}
              className="w-full outline-0 bg-white px-[24px] py-[10px] rounded-[8px] placeholder:text-[#000]/70 placeholder:font-normal placeholder:text-[16px]"
              value={state.description}
              onChange={changeFiled}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
