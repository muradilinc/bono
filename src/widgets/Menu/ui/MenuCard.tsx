import { FC } from 'react';
// import { MENU_PASTA } from '../constants/constants';
import { MenuType } from '../../../features/AdminFilterMenu/model/types/type';

const MenuCard: FC<{ menu: MenuType[] }> = ({ menu }) => {
  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] justify-center">
        {menu?.map((item: MenuType) => (
          <div key={item.id} className="relative max-h-[465px] flex-100">
            <img
              className="w-full h-full object-cover"
              src={`https://backend.bono-bar.com${item.image}`}
              // src={item.image}
              alt=""
            />
            <div className="absolute w-full bottom-0 bg-[rgba(23,23,23,0.6)] p-[10px]">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold">{item.title}</h3>
                <h3 className="text-[16px] font-semibold">{item.price} с</h3>
              </div>
              <p className="text-[12px] text-wrap">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
