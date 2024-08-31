import { User } from '@/types/User';
import { httpClient } from '@/utils/httpClient';
import { mutate } from 'swr';

export async function createUser(values: Partial<User>) {
  const res = await httpClient.request({
    url: '/users',
    method: 'POST',
    data: JSON.stringify(values),
  });
  mutate('/users');
  return res.data;
}

export async function updateUser(values: Partial<User>) {
  const res = await httpClient.request({
    url: `/users/${values.id}`,
    method: 'PUT',
    data: JSON.stringify(values),
  });
  mutate('/users');
  return res.data;
}

export async function deleteUser(id: number) {
  const res = await httpClient.request({
    url: `/users/${id}`,
    method: 'DELETE',
  });
  mutate('/users');
  return res.data;
}
