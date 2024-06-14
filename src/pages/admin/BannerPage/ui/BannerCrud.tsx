import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  selectBannersId,
  selectBannersTopik,
} from '../../../../features/banner/model/bannerSlice';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  addBannersTopik,
  deleteBannersTopik,
  getBannersId,
  getBannersTopik,
  updateBannersId,
  updateBannersTopikId,
} from '../../../../features/banner/api/bannerThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { BannerCardsForm } from '../types/type';
import ModalPopUp from '../../../../shared/ui/ModalPopUp';
import { Trash } from '@phosphor-icons/react';
import ModalDelete from '../../../../shared/ui/ModalDelete';

const BannerCrud = () => {
  const banners = useAppSelector(selectBannersId);
  const bannersTopik = useAppSelector(selectBannersTopik);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const nav = useNavigate();
  const refFile = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BannerCardsForm>({
    title: '',
    subtitle: '',
  });
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [popUp, setPopUp] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const refAddTopik = useRef<HTMLInputElement>(null);
  const [idDeleteTopik, setIdDeleteTopik] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(getBannersId(id)).unwrap();
      }
      await dispatch(getBannersTopik()).unwrap();
    };
    fetchData();
  }, [dispatch, id, selectedImageId]);

  useEffect(() => {
    if (banners) {
      setFormData({
        title: banners.title || '',
        subtitle: banners.subtitle || '',
      });
    }
  }, [banners]);

  const selectImage = (idTopik: string) => {
    setSelectedImageId(idTopik);
    if (refFile.current) {
      refFile.current.click();
    }
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = {
      title: formData.title.trim() === '' ? banners?.title : formData.title,
      subtitle:
        formData.subtitle.trim() === '' ? banners?.subtitle : formData.subtitle,
      topik_baner: banners?.topik_baner.map((item) => item.id),
    };
    await dispatch(
      updateBannersId({ id: id as string, data: updatedFormData }),
    ).unwrap();
    setPopUp(true);
    const time = setTimeout(() => {
      nav('/admin/');
    }, 3000);
    return () => clearTimeout(time);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('img', files[0]);
      await dispatch(
        updateBannersTopikId({ id: selectedImageId, data: formData }),
      );
      dispatch(getBannersTopik());
      setSelectedImageId(null);
    }
  };
  const handleDeleteId = (idImg: string) => {
    setModalDelete(true);
    setIdDeleteTopik(idImg);
  };

  const handleDelete = async () => {
    await dispatch(deleteBannersTopik({ id: idDeleteTopik })).unwrap();
    dispatch(getBannersTopik());
  };

  const addTopik = async (e: ChangeEvent<HTMLInputElement>) => {
    if (bannersTopik.length >= 3) {
      alert('Вы можете создать только 3 картинки банера');
    } else {
      const { files } = e.target;
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append('img', files[0]);
        setPopUp(true);
        await dispatch(addBannersTopik({ formData: formData })).unwrap();
        dispatch(getBannersTopik());
      }
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <section className="bg-black text-white px-[30px] py-[18px] flex flex-col gap-[30px] min-h-[700px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-medium">Баннер</h1>
          <button
            type="submit"
            className="bg-[#6BC678] px-[24px] py-[10px] rounded-lg flex items-center"
          >
            Сохранить
          </button>
        </div>

        <div>
          <div>
            <p className="text-[14px] pb-[10px]">Заголовок</p>
            <input
              onChange={handleChange}
              name="title"
              className="bg-[#2B2B2B] border-[#C1C1C1] border-2 rounded-[4px] w-full h-[56px] px-[10px]"
              type="text"
            />
          </div>
          <div>
            <p className="text-[14px] pb-[10px] mt-[20px]">Подзаголовок</p>
            <input
              onChange={handleChange}
              name="subtitle"
              className="bg-[#2B2B2B] border-[#C1C1C1] border-2 rounded-[4px] w-full h-[56px] px-[10px]"
              type="text"
            />
          </div>

          <div className="flex items-center justify-between mt-[30px]">
            <h1 className="text-[20px] font-medium">
              ФОТОГРАФИЯ ГЛАВНОГО БАННЕРА
            </h1>
            <input
              onChange={addTopik}
              ref={refAddTopik}
              className="hidden"
              type="file"
            />
            <button
              onClick={() => refAddTopik.current?.click()}
              type="button"
              className="bg-[#6BC678] px-[24px] py-[10px] rounded-lg flex items-center"
            >
              + Добавить
            </button>
          </div>

          <div className="mt-[30px]">
            {bannersTopik.map((img) => (
              <div
                className="flex items-center justify-between my-[30px]"
                key={img.id}
              >
                <img
                  className="w-[700px] h-[350px] rounded-[4px]"
                  src={img.img}
                  alt="no img"
                />
                <input
                  onChange={handleChangeFile}
                  name="img"
                  ref={refFile}
                  type="file"
                  className="hidden"
                />
                <div className="flex items-center gap-[10px]">
                  <button
                    type="button"
                    onClick={() => selectImage(String(img.id))}
                    className="bg-[#2B2B2B] rounded-[4px] py-[12px] px-[16px]"
                  >
                    Загрузить фото
                  </button>
                  <button
                    onClick={() => handleDeleteId(String(img.id))}
                    type="button"
                    className="flex items-center justify-center text-white bg-[#ff0000ab] rounded-[8px] w-[40px] h-[45px] ml-[10px]"
                  >
                    <Trash size={32} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {popUp && (
        <ModalPopUp
          popUp={popUp}
          setPopUp={setPopUp}
          propText={'Изменение сохранены'}
        />
      )}
      {modalDelete && (
        <ModalDelete
          addModal={modalDelete}
          setAddModal={setModalDelete}
          onDelete={handleDelete}
        />
      )}
    </form>
  );
};

export default BannerCrud;
