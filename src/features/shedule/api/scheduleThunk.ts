import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../app/axiosApi';
import {
  AdminIncomingType,
  FormComeMutation,
} from '../../../shared/types/Type';
import { Schedule } from '../model/scheduleSlice';
import { calculateEndTime } from '../calculateEndTime';

// // Функция для очистки номера телефона
// const formatPhoneNumber = (phoneNumber: string) => {
//   // Удалить ведущий ноль и код страны +996
//   let cleanedPhoneNumber = phoneNumber.replace(/^0/, ''); // Удаляет ведущий ноль
//   cleanedPhoneNumber = cleanedPhoneNumber.replace(/^\+996/, ''); // Удаляет +996
//   // Возвращает номер с кодом страны +996
//   return '+996' + cleanedPhoneNumber;
// };

export const createBook = createAsyncThunk<void, FormComeMutation>(
  'schedule/createBook',
  async (book) => {
    // const formattedPhoneNumber = formatPhoneNumber(book.phone_number);
    const formattedEndTime = calculateEndTime(book.start_time, book.time_stamp);
    await axiosApi.post('/book/create/book/', {
      ...book,
      phone_number: book.phone_number,
      end_time: formattedEndTime,
    });
  },
);

export interface FilterBook {
  date?: string;
  search_form?: string;
  floor?: number;
  status?: number;
}

export const getSchedules = createAsyncThunk<
  Schedule[],
  FilterBook | undefined
>('schedule/getAll', async (params) => {
  let url = '/book/list/book';
  if (params) {
    const { date, floor, status, search_form } = params;
    const queryParams: string[] = [];
    if (date) queryParams.push(`date=${date}`);
    if (floor) queryParams.push(`floor=${floor}`);
    if (status !== 9 && (status === 0 || status))
      queryParams.push(`status=${status}`);
    if (search_form) queryParams.push(`search_form=${search_form}`);
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
  }

  const response = await axiosApi.get(url);
  return response.data;
});

export const getSchedulesIncoming = createAsyncThunk<Schedule[]>(
  'schedule/getSchedulesIncoming',
  async () => {
    const res = await axiosApi.get(`/book/list/book/?table=1`);
    return res.data;
  },
);

// export const getSchedules = createAsyncThunk<
//   Schedule[],
//   FilterBook | undefined
// >('schedule/getAll', async (params) => {
//   const { date, floor, status } = params!;
//   const response = await axiosApi.get(
//     `/book/list/book?date=${date}&floor=${floor}${status ? `&status=${status}` : ''} `,
//   );
//   return response.data;
// });

// export const getSchedulesByFilter = createAsyncThunk<Schedule[], FilterBook>(
//   'schedule/getByFilter',
//   async ({ date, floor, status }) => {
//     const response = await axiosApi.get(
//       `/book/filters_by_date_status_floor?date=${date}&floor=${floor}&status=${status}`,
//     );
//     return response.data;
//   },
// );

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
    // await axiosApi.put(`/table/update/table/${book.table}/`, {
    //   number_table: book.table,
    //   book: id,
    // });
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
