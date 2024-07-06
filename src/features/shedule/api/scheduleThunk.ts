import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import {
  AdminIncomingType,
  FormComeMutation,
} from '../../../shared/types/Type';

// Функция для очистки номера телефона
const formatPhoneNumber = (phoneNumber: string) => {
  // Удалить ведущий ноль и код страны +996
  let cleanedPhoneNumber = phoneNumber.replace(/^0/, ''); // Удаляет ведущий ноль
  cleanedPhoneNumber = cleanedPhoneNumber.replace(/^\+996/, ''); // Удаляет +996
  // Возвращает номер с кодом страны +996
  return '+996' + cleanedPhoneNumber;
};

// Функция для вычисления end_time
const calculateEndTime = (startTime: string, timeStamp: string) => {
  const endTime = parseInt(startTime) + parseInt(timeStamp);
  return endTime.toString().padStart(2, '0') + ':00'; // Форматирует время в виде "HH:00"
};

export const createBook = createAsyncThunk<void, FormComeMutation>(
  'schedule/createBook',
  async (book) => {
    const formattedPhoneNumber = formatPhoneNumber(book.phone_number);
    const formattedEndTime = calculateEndTime(book.start_time, book.time_stamp);
    await axiosApi.post('/book/create/book/', {
      ...book,
      title: 'amount',
      time_stamp: book.time_stamp,
      phone_number: formattedPhoneNumber,
      end_time: formattedEndTime,
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

interface UpdateBook {
  id: number;
  book: FormComeMutation;
}

export const updateTableBook = createAsyncThunk<void, UpdateBook>(
  'schedule/updateTable',
  async ({ id, book }) => {
    await axiosApi.put(`/book/update/book/${id}/`, book);
  },
);

export const updateBookIncoming = createAsyncThunk<
  void,
  { id: number; data: AdminIncomingType }
>('schedule/updateStatusId', async ({ id, data }) => {
  await axiosApi.patch(`/book/update/book/${id}/`, data);
});

export const deleteBook = createAsyncThunk<void, number>(
  'schedule/deleteBook',
  async (id) => {
    await axiosApi.delete(`/book/delete/book/${id}/`);
  },
);
