import { Atmosphere } from '../../../../widgets/Atmosphere';
import { Banner } from '../../../../widgets/Banner';
import { Contacts } from '../../../../widgets/Contacts';
import { Menu } from '../../../../widgets/Menu';
import { FormCome } from '../../../../widgets/formCome';
import MainHelmet from '../../../../app/helmet/MainHelmet';
import mainSchema from '../../../../app/schema/mainSchema';

export const HomePage = () => {
  return (
    <div className="text-white">
      <MainHelmet />
      <Banner />
      <Atmosphere />
      <Menu />
      <FormCome />
      <Contacts />
      <script type="application/ld+json">{JSON.stringify(mainSchema)}</script>
    </div>
  );
};
