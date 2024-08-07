//Get
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { Gallery, GalleryId } from '../model/type';

export const getGallery = createAsyncThunk<Gallery[]>(
  'gallery/getAll',
  async () => {
    const res = await axiosApi.get<Gallery[]>(`/gallery/galleries/`);
    return res.data;
  },
);

//Put

export const updateGallery = createAsyncThunk<
  GalleryId,
  { id: string | null; data: File }
>('gallery/updateOne', async ({ id, data }) => {
  const formData = new FormData();
  formData.append('images', data);
  formData.append('title', 'Ресторан');
  formData.append('description', 'Фото');
  const res = await axiosApi.put<GalleryId>(
    `/gallery/gallery_detail/${id}/`,
    formData,
  );
  return res.data;
});
