import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { createSubCategory, getSubCategories } from '../api/subCategoryThunk';
import { getCategories } from '../../../../features/category/categoryThunk';
import { selectCategories } from '../../../../features/category/categorySlice';
import { useNavigate } from 'react-router-dom';
import { SubCategoryMutation } from '../model/sub-category';

export const SubCategoryForm = () => {
  const [subCategory, setSubCategory] = useState<SubCategoryMutation>({
    name: '',
    parent: null,
  });
  const categories = useAppSelector(selectCategories);
  const [popUp, setPopUp] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSubCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addSubCategoryHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setPopUp(true);
      await dispatch(createSubCategory(subCategory)).unwrap();
      await dispatch(getSubCategories()).unwrap();
      setSubCategory({
        name: '',
        parent: null,
      });
      setPopUp(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={addSubCategoryHandle}>
        <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
          <h1 className="text-white font-semibold">Добавить категорию</h1>
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
              Категория
            </p>
            <select
              className="w-full h-[45px] rounded-[8px] px-[10px] text-white bg-[#2B2B2B]"
              name="parent"
              onChange={changeField}
              required
            >
              <option value="">Не выбрано</option>
              {categories.map((category) => (
                <option id={category.id.toString()} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-[rgba(255,255,255,0.8)] text-[14px] mb-[5px]">
              Название
            </p>
            <input
              value={subCategory.name}
              name="name"
              onChange={changeField}
              required
              className="w-full h-[45px] rounded-[8px] px-[10px] text-white bg-[#2B2B2B]"
              placeholder="Наименование категории"
              type="text"
            />
          </div>
        </section>
      </form>
      {popUp ? (
        <ModalPopUp popUp={popUp} setPopUp={setPopUp} propText={'Добавлен'} />
      ) : null}
    </>
  );
};
