import { FC, useState } from 'react';
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

  return (
    <div
      onClick={() => setModal(true)}
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
          addModal={modal}
          setAddModal={setModal}
          onDelete={() => onDelete(id)}
        />
      )}
    </div>
  );
};
