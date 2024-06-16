import { Atmosphere } from '../../../../widgets/Atmosphere';
import { Banner } from '../../../../widgets/Banner';
import { Contacts } from '../../../../widgets/Contacts';
import { Menu } from '../../../../widgets/Menu';

export const HomePage = () => {
  return (
    <div className="text-white">
      <Banner />
      <Atmosphere />
      <Menu />
      <Contacts />
    </div>
  );
};
