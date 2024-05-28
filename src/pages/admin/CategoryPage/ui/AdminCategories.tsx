import { ICategoryProp2 } from '../Type/Type';
import AdminCategoriesCard from './AdminCategoriesCard';

export const AdminCategories = ({
  category,
  setActiveBtn,
  setCategory,
}: ICategoryProp2) => {
  return (
    <>
      <header className="flex items-center justify-between w-full h-[60px] bg-[#E6F3FF] px-[20px]">
        <h1 className="text-[rgba(0,0,0,0.6)] font-semibold">Категория</h1>
        <button
          onClick={() => setActiveBtn('Добавить категорию')}
          className="font-semibold text-white bg-[rgba(87,128,235,1)] rounded-[8px] w-[125px] h-[40px]"
        >
          Добавить
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
                category={category}
                setCategory={setCategory}
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
