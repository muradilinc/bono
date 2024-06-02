import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import { IForms } from '../../../shared/types/Type';
import dayjs from 'dayjs';

export const getSchedules = createAsyncThunk('schedule/getAll', async () => {
  const response = await axiosApi.get('/book/list/book/');
  return response.data;
});

export const createBook = createAsyncThunk<void, IForms>(
  'schedule/createBook',
  async (book) => {
    const endTime = parseInt(book.time) + parseInt(book.timeA);
    await axiosApi.post('/book/create/book/', {
      title: 'Amount',
      user_name: book.name,
      phone_number: '+' + book.tel,
      time_stamp: book.time,
      will_come: dayjs(new Date()).format('YYYY-MM-DD'),
      start_time: book.time,
      end_time: endTime.toString() + ':00',
      amount_guest: book.guests,
      table: 2,
      comment: book.comments,
    });
  },
);
