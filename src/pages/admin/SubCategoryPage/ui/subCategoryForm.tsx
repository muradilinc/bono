import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  createSubCategory,
  getSingleSubCategory,
  getSubCategories,
  updateSubCategory,
} from '../api/subCategoryThunk';
import { getCategories } from '../../../../features/category/categoryThunk';
import { selectCategories } from '../../../../features/category/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { SubCategoryMutation } from '../model/sub-category';
import {
  selectSubCategory,
  selectSubCategoryLoading,
} from '../model/subCategorySlice';
import Loading from '../../../../shared/ui/Loading';
import { toast } from 'react-toastify';

export const SubCategoryForm = () => {
  const [subCategory, setSubCategory] = useState<SubCategoryMutation>({
    name: '',
    parent_details: null,
  });
  const categories = useAppSelector(selectCategories);
  const subCategoryApi = useAppSelector(selectSubCategory);
  const loading = useAppSelector(selectSubCategoryLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleSubCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && subCategoryApi) {
      setSubCategory((prevState) => ({
        ...prevState,
        ...subCategoryApi,
      }));
    }
  }, [id, subCategoryApi]);

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
      if (id) {
        await dispatch(updateSubCategory({ id, subCategory })).unwrap();
        toast.success('Успешно обновлен!');
      } else {
        await dispatch(createSubCategory(subCategory)).unwrap();
        toast.success('Успешно создан!');
      }
      await dispatch(getSubCategories()).unwrap();
      setSubCategory({
        name: '',
        parent_details: null,
      });
      navigate(-1);
    } catch (error) {
      toast.error('Что-то пошло не так!');
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
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
            {subCategory.parent_details ? (
              <option>{subCategory.parent_details.name}</option>
            ) : (
              <option value="">Не выбрано</option>
            )}
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
  );
};
