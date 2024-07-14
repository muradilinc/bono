import { Atmosphere } from '../../../../widgets/Atmosphere';
import { Banner } from '../../../../widgets/Banner';
import { Contacts } from '../../../../widgets/Contacts';
import { Menu } from '../../../../widgets/Menu';
import { FormCome } from '../../../../widgets/formCome';
import MainHelmet from '../../../../app/helmet/MainHelmet';
import mainSchema from '../../../../app/schema/mainSchema';
import { Helmet } from 'react-helmet-async';

export const HomePage = () => {
  return (
    <div className="text-white">
      <MainHelmet />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(mainSchema)}</script>
      </Helmet>
      <Banner />
      <Atmosphere />
      <Menu />
      <FormCome />
      <Contacts />
    </div>
  );
};
