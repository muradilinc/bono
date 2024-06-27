import { Helmet } from 'react-helmet-async';
import img from '../../../public/images/placeholder.jpeg';

const MainHelmet = () => {
  return (
    <Helmet>
      <meta
        name="description"
        content="Добро пожаловать в Боно Бар - стильный ресторан и паб, предлагающий уникальное сочетание европейской и итальянской кухонь.
         Наслаждайтесь изысканными блюдами и разнообразием напитков в уютной атмосфере, идеальной для встреч с друзьями или деловых обедов.
          Откройте для себя вкус и гостеприимство в центре Бишкека."
      />
      <meta
        name="keywords"
        content="гастропаб, европейская кухня, итальянские рецепты, авторская кухня, коктейльная культура, пивной ресторан, вино и коктейли,
         кулинарные шедевры, крафтовое пиво, культура сервиса, ресторан в центре города, вечеринки и мероприятия, музыкальные вечера,
          тематические вечера, аутентичная атмосфера, релаксация и удовольствие, десерты и закуски, кулинарные традиции, уют и комфорт"
      />
      <meta name="url" content="https://bono-bar.com/" />
      <meta
        property="yandex_recommendations_title"
        content="Боно бар | Ресторан боно"
      />
      <meta property="og:title" content="Боно бар | Ресторан боно" />
      <meta
        property="og:description"
        content="Добро пожаловать в Боно Бар - стильный ресторан и паб, предлагающий уникальное сочетание европейской и итальянской кухонь.
         Наслаждайтесь изысканными блюдами и разнообразием напитков в уютной атмосфере, идеальной для встреч с друзьями или деловых обедов.
          Откройте для себя вкус и гостеприимство в центре Бишкека."
      />
      <meta property="og:url" content="https://bono-bar.com/" />
      <meta property="og:image" content={img} />
    </Helmet>
  );
};

export default MainHelmet;
