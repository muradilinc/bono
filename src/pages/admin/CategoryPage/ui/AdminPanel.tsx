import { useState } from 'react';
import { AdminAddCategories } from './AdminAddCategories';
import { AdminCategories } from './AdminCategories';

export const AdminPanel = () => {
  const [activeBtn, setActiveBtn] = useState<string | null>('Категории');

  return (
    <div className="w-full">
      {activeBtn === 'Категории' ? (
        <AdminCategories setActiveBtn={setActiveBtn} />
      ) : null}
      {activeBtn === 'Добавить категорию' ? (
        <AdminAddCategories setActiveBtn={setActiveBtn} />
      ) : null}
    </div>
  );
};
