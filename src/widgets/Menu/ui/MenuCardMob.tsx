import { MENU_PASTA } from '../constants/constants';

const MenuCardMob = () => {
  return (
    <div className="hidden max-md:block">
      <div className="flex items-start flex-wrap xl:justify-between justify-center gap-[20px] mt-[30px]">
        {MENU_PASTA.map((item) => (
          <div key={item.id} className="w-[343px] relative">
            <img
              className="w-[343px] h-[240px] rounded-[4px]"
              src={item.image}
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
        ))}
      </div>
    </div>
  );
};

export default MenuCardMob;
