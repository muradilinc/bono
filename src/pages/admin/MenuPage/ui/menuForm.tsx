import { ChangeEvent, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { MenuItemMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectCategories } from '../../../../features/category/categorySlice';
import { createMenu } from '../../../../features/AdminFilterMenu/api/MenuThunk';
import { selectSubCategories } from '../../SubCategoryPage/model/subCategorySlice';

export const MenuFormPage = () => {
  const initialState: MenuItemMutation = {
    title: '',
    price: 0,
    description: '',
    subcategory: 0,
    category: 0,
    image: null,
  };
  const [state, setState] = useState<MenuItemMutation>(initialState);
  const [imageData, setImageData] = useState('');
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const [currentSubcategory, setCurrentSubcategory] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  const categories = useAppSelector(selectCategories);
  const subcategories = useAppSelector(selectSubCategories);
  const dispatch = useAppDispatch();

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

    if (name === 'category') {
      const categoryID = categories.find((item) => item.name === value);
      if (categoryID) {
        // dispatch(getSubcategory(categoryID.id));
        setCurrentCategory(categoryID.id);
      }
    }
    if (name === 'subcategory') {
      const subcategoryID = subcategories.find((item) => item.name === value);
      if (subcategoryID) {
        // setCurrentSubcategory(subcategoryID?.id);
      }
    }
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('price', state.price.toString());
    formData.append('description', state.description);
    formData.append('category', currentCategory.toString());
    formData.append('subcategory', currentSubcategory.toString());
    if (state.image) {
      formData.append('image', state.image);
    }
    try {
      await dispatch(createMenu(formData)).unwrap();
      setState(initialState);
      setImageData('');
      setFilename('');
      setCurrentCategory(0);
      setCurrentSubcategory(0);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <form onSubmit={onSubmit}>
        <div className="w-full py-[10px] border-opacity-0">
          <div className="container mx-auto flex flex-row justify-between  items-center">
            <h2 className="font-bold text-[20px] text-white font-comfort">
              Добавить меню
            </h2>
            <button
              type="submit"
              className="font-medium text-[16px] text-white bg-[#6BC678] rounded-[8px] px-[10px] py-[10px]"
            >
              Сохранить
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
              className="w-full outline-0 bg-[#2B2B2B] px-[24px] py-[10px] rounded-[8px] placeholder:text-white/70 placeholder:font-normal placeholder:text-[16px]"
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
              name="category"
              id="category"
              required
              value={state.category}
              onChange={changeFiled}
              className="w-full py-[10px] bg-[#2B2B2B] outline-0 rounded-[8px]"
            >
              <option value=""></option>
              {categories?.map((category) => (
                <option key={category?.id} value={category?.name}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="text-white text-[12px] font-medium"
              htmlFor="subcategory"
            >
              Под Категория
            </label>
            <select
              name="subcategory"
              id="subcategory"
              required
              value={state.subcategory}
              onChange={changeFiled}
              className="w-full py-[10px] bg-[#2B2B2B] outline-0 rounded-[8px]"
            >
              <option value=""></option>
              {subcategories?.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.name}>
                  {subcategory.name}
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
                className="w-full bg-[#2B2B2B] outline-0 px-[24px] py-[10px] rounded-[8px] placeholder:text-[#000]/70 placeholder:font-normal placeholder:text-[16px]"
                value={state.price}
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
              className="w-full outline-0 bg-[#2B2B2B] px-[24px] py-[10px] rounded-[8px] placeholder:text-white/70 placeholder:font-normal placeholder:text-[16px]"
              value={state.description}
              onChange={changeFiled}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
