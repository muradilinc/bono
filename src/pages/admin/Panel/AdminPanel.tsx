import { useState } from 'react';
import AdminAddCategories from './AdminAddCategories';
import { ICategory } from './Type/Type';
import AdminCategories from './AdminCategories';

const AdminPanel = () => {
  const [activeBtn, setActiveBtn] = useState<string | null>('Категории');
  const [category, setCategory] = useState<ICategory[]>([]);

  return (
    <div className="w-full">
      {activeBtn === 'Категории' ? (
        <AdminCategories
          category={category}
          setCategory={setCategory}
          setActiveBtn={setActiveBtn}
        />
      ) : null}
      {activeBtn === 'Добавить категорию' ? (
        <AdminAddCategories
          category={category}
          setCategory={setCategory}
          setActiveBtn={setActiveBtn}
        />
      ) : null}
    </div>
  );
};

export default AdminPanel;
