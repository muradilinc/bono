import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { CategoryMutation, ICategoryProp } from '../Type/Type';
import bonoPlaceHolder from '../../../../../public/images/placeholder.jpeg';
import { useAppDispatch } from '../../../../app/store/hooks';
import {
  createCategory,
  getCategories,
} from '../../../../features/category/categoryThunk';
import { toast } from 'react-toastify';

export const AdminAddCategories = ({ setActiveBtn }: ICategoryProp) => {
  const [category, setCategory] = useState<CategoryMutation>({
    name: '',
    image: null,
  });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState('');
  const [imageError, setImageError] = useState(false);
  const dispatch = useAppDispatch();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory((prevState) => ({
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
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setCategory((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setImageError(false);
    }
  };

  const addCategoryHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (!category.image) {
      setImageError(true);
      toast.error('Добавьте фото!');
    } else {
      try {
        await dispatch(createCategory(category)).unwrap();
        await dispatch(getCategories()).unwrap();
        toast.success('Добавлен!');
        setCategory({
          name: '',
          image: null,
        });
        setImageData('');
        if (imageSelect.current) {
          imageSelect.current.value = '';
        }
        setActiveBtn('Категории');
        setImageError(false);
      } catch (err) {
        toast.error('Что-то пошло не так!');
      }
    }
  };

  return (
    <form onSubmit={addCategoryHandle}>
      <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="text-white font-semibold">Добавить категорию</h1>
        <button
          type="submit"
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] w-[125px] h-[40px]"
        >
          Сохранить
        </button>
      </header>
      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <p className="text-[rgba(255,255,255,0.8)] text-[14px] mb-[5px]">
          Название
        </p>
        <input
          value={category.name}
          name="name"
          onChange={changeField}
          required
          className="w-full h-[45px] rounded-[8px] px-[10px] text-white bg-[#2B2B2B]"
          placeholder="Наименование категории"
          type="text"
        />

        <div className="flex items-center justify-between mt-[30px]">
          <div className="flex items-center">
            <img
              className="w-[120px] h-[68px] rounded-[4px]"
              src={imageData ? imageData : bonoPlaceHolder}
              alt="no img"
            />
          </div>
          <input
            onChange={changeImageFiled}
            ref={imageSelect}
            type="file"
            name="image"
            className="hidden"
          />
          <button
            type="button"
            onClick={selectImage}
            className={`${imageError ? 'border-[red]' : 'border-none'} border-2 text-white bg-[#2B2B2B] rounded-[8px] w-[160px] h-[45px]`}
          >
            Загрузить фото
          </button>
        </div>
      </section>
    </form>
  );
};
