import { ICategory2, ICategoryProp } from '../Type/Type';
import { AdminCategoriesCard } from './AdminCategoriesCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminCategories = ({ setActiveBtn }: ICategoryProp) => {
  const [category, setCategory] = useState<ICategory2[]>([]);
  const getCategories = async () => {
    const url = await axios.get(`http://3.87.95.146/category/list_or_create/`);
    setCategory(url.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://3.87.95.146/category/${id}/`);
    // setCategory(prevCategory => prevCategory.filter(el => el.id !== id));
  };

  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-black px-[20px]">
        <h1 className="text-white font-semibold">КАТЕГОРИИ</h1>
        <button
          onClick={() => setActiveBtn('Добавить категорию')}
          className="font-semibold text-white bg-[#6BC678] rounded-[8px] w-[125px] h-[40px]"
        >
          + Добавить
        </button>
      </header>

      <section className="bg-black w-full min-h-[635px] py-[30px] px-[20px]">
        <div>
          {category.length > 0 ? (
            category.map((el, inx) => (
              <AdminCategoriesCard
                el={el}
                inx={inx}
                key={inx}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-white">Пусто</p>
          )}
        </div>
      </section>
    </>
  );
};
