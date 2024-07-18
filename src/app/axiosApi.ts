import axios from 'axios';
import { API_LINK } from './constants/links';
import { FormComeMutation } from '../shared/types/Type';

const axiosApi = axios.create({
  baseURL: API_LINK,
});

export default axiosApi;

const token = process.env.API_BOT;
const id = process.env.API_ID;
const url = `https://api.telegram.org/bot${token}/sendMessage`;

export async function SendData(state: FormComeMutation) {
  let message = `<b>Имя: ${state.user_name}</b> \n`;
  message += `<b>Номер телефона: ${state.phone_number}</b> \n`;
  message += `<b>Дата бронирования: ${state.will_come}</b> \n`;
  message += `<b>Количество персон: ${state.amount_guest}</b> \n`;
  message += `<b>Время бронирования: ${state.start_time}</b> \n`;
  message += `<b>Длительность посещения: ${state.time_stamp}</b> \n`;
  message += `<b>Комментарий: ${state.comment}</b>\n`;
  await axios.post(url, {
    chat_id: id,
    parse_mode: 'html',
    text: message,
  });
}
