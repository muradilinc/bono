import axios from 'axios';
import { API_LINK } from './constants/links';

const axiosApi = axios.create({
  baseURL: API_LINK,
});

export default axiosApi;
