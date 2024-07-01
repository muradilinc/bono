import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { FormComeMutation } from '../../../shared/types/Type';
import dayjs from 'dayjs';

export const createBook = createAsyncThunk<void, FormComeMutation>(
  'schedule/createBook',
  async (book) => {
    const endTime = parseInt(book.time) + parseInt(book.timeSpend);
    await axiosApi.post('/book/create/book/', {
      title: 'amount',
      user_name: book.name,
      phone_number: '+' + book.phone,
      time_stamp: book.time, // кол-во время проведения с эскорт
      will_come: dayjs(book.date).format('YYYY-MM-DD'), // дата когда гость прибудет
      start_time: book.time,
      end_time: endTime.toString() + ':00',
      amount_guest: book.countPerson,
      table: book.table, // номер столик
      comment: book.comment,
    });
  },
);

export const getSchedules = createAsyncThunk('schedule/getAll', async () => {
  const response = await axiosApi.get('/book/list/book/');
  return response.data;
});

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
