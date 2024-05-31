import { FC, useEffect, useState } from 'react';
import { DataMenuCard } from '../model/type/types';
import ModalDelete from '../../../shared/ui/ModalDelete';

export const AdminMenuCard: FC<DataMenuCard> = ({
  id,
  img,
  title,
  text,
  gram,
  price,
  onDelete,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  useEffect(() => {
    if (modal) {
      setAddModal(true);
    }
  }, [modal, addModal]);

  return (
    <div
      onClick={() => setModal((prevState) => !prevState)}
      className="w-[379px] h-[479px] gap-[16px] bg-transparent text-white cursor-pointer"
    >
      <div>
        <img src={img} alt="menu picture" />
      </div>
      <div className="text-2xl font-bold leading-7 pt-[10px] pb-[16px]">
        {title}
      </div>
      <div className="text-base font-normal leading-5 text-left pb-[15px]">
        {text}
      </div>
      <div className="text-base font-normal leading-5 text-left pb-[8px]">
        {gram} Грамм
      </div>
      <div className="font-bold text-2xl">{price} сом</div>
      {modal && (
        <ModalDelete
          addModal={addModal}
          setAddModal={setAddModal}
          onDelete={() => onDelete(id)}
        />
      )}
    </div>
  );
};
