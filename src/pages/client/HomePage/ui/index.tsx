import { Atmosphere } from '../../../../widgets/Atmosphere';
import { Banner } from '../../../../widgets/Banner';
import { Contacts } from '../../../../widgets/Contacts';
import { Footer } from '../../../../widgets/Footer';
import { Header } from '../../../../widgets/Header';
import { Menu } from '../../../../widgets/Menu';

export const HomePage = () => {
  return (
    <div className="text-white">
      <Header />
      <Banner />
      <Atmosphere />
      <Menu />
      <Contacts />
      <Footer />
    </div>
  );
};
