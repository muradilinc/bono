import { Atmosphere } from '../../../../widgets/Atmosphere';
import { Banner } from '../../../../widgets/Banner';
import { Contacts } from '../../../../widgets/Contacts';
import { Menu } from '../../../../widgets/Menu';
import { FormCome } from '../../../../widgets/formCome';

export const HomePage = () => {
  return (
    <div className="text-white">
      <Banner />
      <Atmosphere />
      <Menu />
      <FormCome />
      <Contacts />
    </div>
  );
};
