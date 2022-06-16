import axios from 'axios';

const NEWS_API_BASE_URL =
  'https://newsapi.org/v2';

export const newsAPI = axios.create({
  baseURL: NEWS_API_BASE_URL,
});
