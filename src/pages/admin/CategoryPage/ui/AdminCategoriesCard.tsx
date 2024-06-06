import React, { ChangeEvent, useRef, useState } from 'react';
import { Category, CategoryMutation } from '../Type/Type';
import { Check, Pen, Trash } from '@phosphor-icons/react';
import ModalDelete from '../../../../shared/ui/ModalDelete';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';
import { useAppDispatch } from '../../../../app/store/hooks';
import {
  changeCategory,
  deleteCategory,
  getCategories,
} from '../../../../features/category/categoryThunk';

interface Props {
  category: Category;
}

export const AdminCategoriesCard: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<CategoryMutation>({
    name: '',
    image: null,
  });
  const [active, setActive] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const imageSelect = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState('');

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeImageFiled = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      await dispatch(
        changeCategory({
          id: category.id,
          category: { name: state.name, image: files[0] },
        }),
      ).unwrap();
      await dispatch(getCategories()).unwrap();
      setImageData(imageUrl);
    }
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const clickChangeCategory = (category: { name: string }) => {
    setState((prevState) => ({
      ...prevState,
      ...category,
    }));
    setIsEdit(true);
  };

  const saveCategory = async () => {
    await dispatch(
      changeCategory({
        id: category.id,
        category: { name: state.name, image: state.image },
      }),
    ).unwrap();
    await dispatch(getCategories()).unwrap();
    setIsEdit(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCategory(id)).unwrap();
    await dispatch(getCategories()).unwrap();
    setActive(false);
  };

  return (
    <>
      <div className="flex items-center justify-between my-[20px]">
        <div className="flex items-center">
          <img
            className="w-[120px] h-[68px] rounded-[4px]"
            src={
              !imageData ? 'http://3.87.95.146/' + category.image : imageData
            }
            alt="no img"
          />
          <div className="text-white ml-[15px]">
            {isEdit ? (
              <div className="flex items-center gap-x-3">
                <input
                  value={state.name}
                  name="name"
                  onChange={changeField}
                  type="text"
                  className="bg-black border-b border-white"
                />
                <button onClick={saveCategory}>
                  <Check size={22} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-x-3">
                <p>Название: {category.name}</p>
                <button
                  onClick={() => clickChangeCategory({ name: category.name })}
                >
                  <Pen size={22} />
                </button>
              </div>
            )}
            <p>
              Дата загрузки:{' '}
              {category
                ? new Date(category.created_at).toLocaleDateString('ru-RU')
                : '...'}
            </p>
          </div>
        </div>
        <input
          ref={imageSelect}
          type="file"
          onChange={changeImageFiled}
          className="hidden"
        />
        <div className="flex items-center">
          <button
            onClick={selectImage}
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
          onDelete={() => handleDelete(category.id)}
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
