import { BTN_MENU } from '../constants/constants';
import { useState } from 'react';
import MenuCardMob from './MenuCardMob';
import MenuCard from './MenuCard';
import KitchenHelmet from '../../../app/helmet/KitchenHelmet';
import kitchenSchema from '../../../app/schema/kitchenSchema';

const MainMenu = () => {
  const [btn, setBtn] = useState<number>(0);
  return (
    <div className="text-white pt-[170px] px-[10px] w-[90%] m-auto pb-[50px]">
      <span className="text-[14px] text-[#C1C1C1]">Main / menu</span>
      <div className="mt-[30px] flex items-center flex-wrap gap-[10px]">
        {BTN_MENU.map((item, inx) => (
          <button
            onClick={() => setBtn(inx)}
            className={`ml-[10px] ${btn === inx ? 'border-white border-b-2' : ''}`}
            key={inx}
          >
            {item}
          </button>
        ))}
      </div>
      <h1 className="lg:text-[36px] md:text-[32px] sm:text-[27px] text-[24px] mt-[30px]">
        {BTN_MENU[btn]}
      </h1>
      <MenuCard />
      <MenuCardMob />
      <KitchenHelmet />
      <script type="application/ld+json">
        {JSON.stringify(kitchenSchema)}
      </script>
    </div>
  );
};

export default MainMenu;
