import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { FormComeMutation } from '../../../shared/types/Type';

export const createBook = createAsyncThunk<void, FormComeMutation>(
  'schedule/createBook',
  async (book) => {
    const endTime = parseInt(book.start_time) + parseInt(book.time_stamp);
    await axiosApi.post('/book/create/book/', {
      ...book,
      title: 'amount',
      time_stamp: '12:00',
      phone_number: '+' + book.phone_number,
      end_time: endTime.toString() + ':00',
    });
  },
);

export const getSchedules = createAsyncThunk('schedule/getAll', async () => {
  const response = await axiosApi.get('/book/list/book/');
  return response.data;
});

export const getSingleBook = createAsyncThunk<FormComeMutation, number>(
  'schedule/getSingle',
  async (id) => {
    const response = await axiosApi.get(`/book/detail/book/${id}/`);
    return response.data;
  },
);

export const updateBook = createAsyncThunk<void, number>(
  'schedule/updateStatus',
  async (id) => {
    await axiosApi.patch(`/book/update/book/${id}/`, { is_come: true });
  },
);

export const deleteBook = createAsyncThunk<void, number>(
  'schedule/deleteBook',
  async (id) => {
    await axiosApi.delete(`/book/delete/book/${id}/`);
  },
);
