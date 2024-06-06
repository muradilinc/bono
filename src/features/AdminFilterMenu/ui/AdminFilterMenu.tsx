import { FC, useMemo, useState } from 'react';
import { DATA_MENU_CARD, FILTER_DATA } from '../model/constants/constant';
import { DataMenuCard } from '../model/types/type';
import { AdminMenuCard } from '../../../entities/AdminMenuCard';
import { useNavigate } from 'react-router-dom';
import { AdminButton } from '../../../shared/ui/AdminButton';

export const AdminFilterMenu: FC = () => {
  const [dataMenu, setDataMenu] = useState<DataMenuCard[]>(DATA_MENU_CARD);
  const navigate = useNavigate();
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
          className="py-[10px] px-[15px] hover:border-b hover:border-white"
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

  const onNavigate = () => {
    navigate('/admin/menu-submit');
  };

  const onSubmit = () => {
    console.log('onsubmit');
  };

  return (
    <>
      <div className="w-full h-screen bg-black text-white flex flex-col justify-around items-center gap-[15px] border-l border-opacity-0">
        <div className="flex flex-col items-center">
          <div className="flex gap-[16px] pt-[40px] pb-[24px]">
            <AdminButton
              title="Добавить"
              icon="/images/Plus.svg"
              onSubmit={onNavigate}
            />
            <AdminButton
              title="Редактировать"
              icon="/images/iconEdit.svg"
              onSubmit={onSubmit}
            />
            <AdminButton
              title="Удалить"
              icon="/images/iconDelete.svg"
              onSubmit={onSubmit}
            />
          </div>
          <div className="flex">{renderFilter}</div>
        </div>
        <div className="w-full h-full overflow-auto bg-black flex flex-row flex-wrap justify-center py-[50px] px-[30px] gap-y-3">
          <div className="flex flex-wrap gap-[24px]">
            {dataMenu.length ? (
              dataMenu.map((item) => (
                <AdminMenuCard
                  key={item.id}
                  id={item.id}
                  category={item.category}
                  img={item.img}
                  title={item.title}
                  text={item.text}
                  price={item.price}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="text-white w-full text-center">
                Такого меню нет.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
