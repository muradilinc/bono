import { FC, useEffect, useState } from 'react';
import { DataMenuCard } from '../model/type/types';
import ModalDelete from '../../../shared/ui/ModalDelete';

export const AdminMenuCard: FC<DataMenuCard> = ({
  id,
  image,
  title,
  description,
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
    <div className="relative">
      <div
        onClick={() => setModal(true)}
        className="w-[355px] h-[270px] rounded-[4px] text-white cursor-pointer relative overflow-hidden"
      >
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={`http://3.87.95.146${image}`}
            alt="menu picture"
          />
        </div>
        <div className="w-full h-[81px] absolute bottom-0 bg-[#17171799] backdrop-blur-sm px-[8px] py-[8px]">
          <div className="flex justify-between text-[16px] font-bold leading-7">
            <div>{title}</div>
            <div className="font-bold text-[16px]">{price} с</div>
          </div>
          <div className="text-[12px] font-normal leading-5 text-left pb-[15px]">
            {description}
          </div>
        </div>
      </div>
      {modal && (
        <ModalDelete
          addModal={modal}
          setAddModal={setModal}
          onDelete={() => {
            onDelete(id);
            setModal(false);
          }}
        />
      )}
    </div>
  );
};
