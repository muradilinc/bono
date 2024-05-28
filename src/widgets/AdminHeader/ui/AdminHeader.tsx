import { FC, useEffect, useState } from 'react';
import { FilterButton } from './FilterButton';
import { Calendar } from './Calendar';
import AddModal from '../../../shared/ui/AddModal';

export const AdminHeader: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  useEffect(() => {}, [modal, addModal]);
  return (
    <>
      <div className="w-full flex justify-b items-center bg-[black] p-4">
        <div className="w-full flex gap-[30px] items-center justify-b">
          <Calendar />
          <FilterButton
            setAddModal={setAddModal}
            setModal={setModal}
            modal={modal}
          />
        </div>
      </div>
      {modal ? (
        <AddModal addModal={addModal} setAddModal={setAddModal} />
      ) : null}
    </>
  );
};
