import { Contacts } from '../../../../widgets/Contacts';
import { Footer } from '../../../../widgets/Footer';
import { Header } from '../../../../widgets/Header';
import { Menu } from '../../../../widgets/Menu';

export const HomePage = () => {
  return (
    <div className="text-white">
      <h1>Bono restaurant!</h1>
      <Header />
      <Menu />
      <Contacts />
      <Footer />
    </div>
  );
};
