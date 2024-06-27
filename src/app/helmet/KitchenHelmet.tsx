import { Helmet } from 'react-helmet-async';
import img from '../../../public/images/pasta.png';

const KitchenHelmet = () => {
  return (
    <Helmet>
      <title>Меню боно | Кухня ресторана боно</title>
      <meta
        name="description"
        content="В меню ресторана Боно представлено разнообразие блюд европейской и итальянской кухни,
        приготовленных с использованием только самых свежих и качественных ингредиентов. Откройте для себя наши изысканные пасты,
         сочные итальянские пиццы с разнообразными начинками и ароматные ризотто с насыщенными вкусами.
         Наше меню также включает разнообразные свежие салаты, приготовленные с местными овощами и натуральными продуктами,
          и богатый выбор закусок и десертов, чтобы удовлетворить любой вкус. Каждое блюдо в нашем ресторане приготовлено с
           заботой о деталях и представляет собой настоящее гастрономическое искусство. Погружаясь в атмосферу Боно,
            вы насладитесь не только превосходным вкусом, но и уютной обстановкой, идеальной для романтического ужина,
             делового обеда или вечерней встречи с друзьями."
      />
      <meta
        name="keywords"
        content="итальянская кухня, европейская кухня, ресторан Бишкек, паб Бишкек, просторная терраса, паста, пицца, ризотто, свежие салаты,
         закуски, десерты, гастрономическое искусство, качественные ингредиенты, уютная атмосфера, романтический ужин, деловой обед,
          вечеринка с друзьями"
      />
      <meta name="url" content="https://bono-bar.com/kitchen" />
      <meta
        property="yandex_recommendations_title"
        content="Меню боно | Кухня ресторана боно"
      />
      <meta property="og:title" content="Меню боно | Кухня ресторана боно" />
      <meta
        property="og:description"
        content="В меню ресторана Боно представлено разнообразие блюд европейской и итальянской кухни,
        приготовленных с использованием только самых свежих и качественных ингредиентов. Откройте для себя наши изысканные пасты,
         сочные итальянские пиццы с разнообразными начинками и ароматные ризотто с насыщенными вкусами.
         Наше меню также включает разнообразные свежие салаты, приготовленные с местными овощами и натуральными продуктами,
          и богатый выбор закусок и десертов, чтобы удовлетворить любой вкус. Каждое блюдо в нашем ресторане приготовлено с
           заботой о деталях и представляет собой настоящее гастрономическое искусство. Погружаясь в атмосферу Боно,
            вы насладитесь не только превосходным вкусом, но и уютной обстановкой, идеальной для романтического ужина,
             делового обеда или вечерней встречи с друзьями."
      />
      <meta property="og:url" content="https://bono-bar.com/kitchen" />
      <meta property="og:image" content={img} />
    </Helmet>
  );
};

export default KitchenHelmet;
