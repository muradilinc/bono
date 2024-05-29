import { FC, useMemo, useState } from 'react';
import { DATA_MENU_CARD, FILTER_DATA } from '../model/constants/constant';
import { DataMenuCard } from '../model/types/type';
import { AdminMenuCard } from '../../../entities/AdminMenuCard';

export const AdminFilterMenu: FC = () => {
  const [dataMenu, setDataMenu] = useState<DataMenuCard[]>(DATA_MENU_CARD);
  const renderFilter = useMemo(() => {
    const onFiltered = (title: string) => {
      if (title === 'Все') {
        setDataMenu(DATA_MENU_CARD);
      } else {
        const filteredData = DATA_MENU_CARD?.filter(
          (item) => item.category === title,
        );
        setDataMenu(filteredData);
      }
    };
    return FILTER_DATA?.map((item, index) => (
      <div key={index}>
        <button
          onClick={() => onFiltered(item.title)}
          className="py-[10px] px-[15px] duration-300 hover:bg-[#5780EB] hover:text-white rounded-[12px]"
        >
          {item.title}
        </button>
      </div>
    ));
  }, []);

  const onDelete = (id: number) => {
    const deleteData = dataMenu?.filter((item) => item.id !== id);
    setDataMenu(deleteData);
  };

  return (
    <>
      <div className="w-full h-[60px] bg-[#E6F3FF] flex flex-row justify-around items-center gap-[15px] border-l border-opacity-0">
        {renderFilter}
      </div>
      <div className="w-full h-[677px] overflow-auto bg-black flex flex-wrap gap-x-[16px] gap-y-[30px] py-[50px] px-[30px]">
        {dataMenu.length ? (
          dataMenu.map((item) => (
            <AdminMenuCard
              key={item.id}
              id={item.id}
              category={item.category}
              img={item.img}
              title={item.title}
              text={item.text}
              gram={item.gram}
              price={item.price}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="text-white w-full text-center">Такого меню нет.</div>
        )}
      </div>
    </>
  );
};
