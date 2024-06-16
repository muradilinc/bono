import { MENU_PASTA } from '../constants/constants';

const MenuCard = () => {
  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] max-xl:justify-center max-md:hidden">
        {MENU_PASTA.map((item, inx) =>
          inx % 3 !== 2 ? (
            <div key={item.id} className="relative">
              <img className="w-[600px] h-[370px]" src={item.img} alt="" />
              <div className="absolute bottom-0 bg-[rgba(23,23,23,0.6)] px-[10px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  <h3 className="text-[16px] font-semibold">{item.price} с</h3>
                </div>
                <p className="text-[12px]">{item.description}</p>
              </div>
            </div>
          ) : (
            <div key={item.id} className="relative w-full">
              <img className="w-full h-[550px]" src={item.img} alt="" />
              <div className="absolute bottom-0 left-0 right-0 bg-[rgba(23,23,23,0.6)] px-[10px] py-[10px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  <h3 className="text-[16px] font-semibold">{item.price} с</h3>
                </div>
                <p className="text-[12px]">{item.description}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MenuCard;
