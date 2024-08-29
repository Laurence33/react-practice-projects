import useSWR from 'swr';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export const fetcher = async <T>(
  url: string,
  method: HttpMethod = 'GET',
  data?: any
): Promise<T> => {
  const response = await axiosInstance.request<T>({
    url,
    method,
    data,
  });
  return response.data;
};

export function useApi<T>(url: string) {
  const { data, error, mutate } = useSWR<T>(url, () => fetcher<T>(url));

  const post = async (body: any) => {
    const result = await fetcher<T>(url, 'POST', body);
    await mutate();
    return result;
  };

  const put = async (id: string | number, body: any) => {
    const result = await fetcher<T>(`${url}/${id}`, 'PUT', body);
    await mutate();
    return result;
  };

  const del = async (id: string | number) => {
    await fetcher(`${url}/${id}`, 'DELETE');
    await mutate();
  };

  return {
    data,
    error,
    isLoading: !error && !data,
    post,
    put,
    del,
  };
}
