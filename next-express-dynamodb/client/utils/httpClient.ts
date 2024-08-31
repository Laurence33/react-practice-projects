import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:4001',
});

export const fetcher = (url: string, params?: Record<string, string>) =>
  httpClient({ url, method: 'GET', params }).then((res) => res.data);
