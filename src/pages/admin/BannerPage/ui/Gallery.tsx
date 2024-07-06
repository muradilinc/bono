import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GalleryProps } from '../types/type';
import {
  getGallery,
  updateGallery,
} from '../../../../features/gallery/api/galleryThunk';
import { useAppDispatch } from '../../../../app/store/hooks';
import { API_LINK } from '../../../../app/constants/links';
import { toast } from 'react-toastify';

const GalleryMain = ({ galleries }: GalleryProps) => {
  const dispatch = useAppDispatch();
  const refFile = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {}, [id]);

  const btnClick = (id: string) => {
    if (refFile.current) {
      setId(id);
      refFile.current.click();
    }
  };
  const editImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    try {
      if (files && files.length > 0) {
        const file = files[0];
        await dispatch(updateGallery({ id: id, data: file }));
        await dispatch(getGallery());
        toast.success('Фото успешно обновлено!');
      }
    } catch (err) {
      toast.error('Что то пошло не так!');
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
              src={API_LINK.slice(0, -4) + el.image_set[0].image}
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
    </div>
  );
};

export default GalleryMain;
