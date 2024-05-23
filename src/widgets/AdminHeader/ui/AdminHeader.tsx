import { FC } from 'react';
import { FilterButton } from './FilterButton';
import { Calendar } from './Calendar';

export const AdminHeader: FC = () => {
  return (
    <div className="w-full flex justify-b items-center bg-[black] p-4">
      <div className="w-full flex gap-[30px] items-center justify-b">
        <Calendar />
        <FilterButton />
      </div>
    </div>
  );
};
