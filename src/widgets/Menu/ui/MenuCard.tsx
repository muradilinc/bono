import { MENU_PASTA } from '../constants/constants';

const MenuCard = () => {
  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] max-xl:justify-center max-md:hidden">
        {MENU_PASTA.map((item, inx) =>
          inx % 6 === 0 || inx % 6 === 1 || inx % 6 === 4 || inx % 6 === 5 ? (
            <div
              key={item.id}
              className={`relative ${inx % 6 === 0 || inx % 6 === 1 || inx % 6 === 4 || inx % 6 === 5 ? 'flex-50' : 'flex-100'}`}
            >
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt=""
              />
              <div className="absolute bottom-0 bg-[rgba(23,23,23,0.6)] px-[10px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  <h3 className="text-[16px] font-semibold">{item.price} с</h3>
                </div>
                <p className="text-[12px]">{item.description}</p>
              </div>
            </div>
          ) : (
            <div
              key={item.id}
              className={`relative ${inx % 6 === 0 || inx % 6 === 1 || inx % 6 === 4 || inx % 6 === 5 ? 'flex-50' : 'flex-100'}`}
            >
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt=""
              />
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
