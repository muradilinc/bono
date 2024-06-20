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
  { id: string | null; data: FormData }
>('gallery/updateOne', async ({ id, data }) => {
  const res = await axiosApi.put<GalleryId>(
    `http://3.87.95.146/gallery/gallery_detail/${id}/`,
    data,
  );
  return res.data;
});
