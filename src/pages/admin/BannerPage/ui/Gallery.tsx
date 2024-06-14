import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GalleryProps } from '../types/type';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';
import {
  getGallery,
  updateGallery,
} from '../../../../features/gallery/api/galleryThunk';
import { useAppDispatch } from '../../../../app/store/hooks';

const GalleryMain = ({ galleries }: GalleryProps) => {
  const dispatch = useAppDispatch();
  const refFile = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string | null>(null);
  const [popUp, setPopUp] = useState<boolean>(false);

  useEffect(() => {}, [id]);

  const btnClick = (id: string) => {
    if (refFile.current) {
      setId(id);
      refFile.current.click();
    }
  };
  const editImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('images', files[0]);
      formData.append('title', 'Ресторан');
      formData.append('description', 'Фото');
      await dispatch(updateGallery({ id: id, data: formData }));
      await dispatch(getGallery());
      setPopUp(true);
    }
  };

  return (
    <div className="my-[20px]">
      {galleries.map((el) => (
        <div
          key={el.id}
          className="flex items-center justify-between w-full my-[20px]"
        >
          <div className="flex items-center">
            <img
              className="w-[120px] h-[68px] rounded-[4px]"
              src={'http://3.87.95.146/' + el.image_set[0].image}
              alt="no img"
            />
            <div className="ml-[10px]">
              <p>Название: {el.title}</p>
              <p>Описание :{el.description}</p>
            </div>
          </div>
          <input
            onChange={editImg}
            ref={refFile}
            type="file"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => btnClick(String(el.id))}
            className="bg-[#2B2B2B] px-[16px] py-[12px] rounded-[4px]"
          >
            Загрузить фото
          </button>
        </div>
      ))}
      {popUp && (
        <ModalPopUp
          popUp={popUp}
          setPopUp={setPopUp}
          propText={'Фото успешно заменен'}
        />
      )}
    </div>
  );
};

export default GalleryMain;
