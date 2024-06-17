import { List } from '@/types';
import { apiRequest } from './api';

const token = localStorage.getItem('token');

export const getListsFromDB = async (): Promise<List[]> => {
  const errorMsg = `Failed to fetch lists from the DB`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api`,
    errorMsg,
    options,
  );
};

export const createListInDB = async (list: List): Promise<List> => {
  console.log(list);
  const errorMsg = `Failed to create the list in the DB`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: list.userId,
      name: list.name,
      tasks: list.tasks,
    }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/lists`,
    errorMsg,
    options,
  );
};

export const deleteListFromDB = async (id: string): Promise<void> => {
  const errorMsg = `Failed to delete the list from the DB`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  };
  await apiRequest(
    `${import.meta.env.VITE_API_URL}api/lists/${id}`,
    errorMsg,
    options,
  );
};

export const editListInDB = async (id: string, name: string): Promise<List> => {
  const errorMsg = `Failed to edit the list in the DB`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, id }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/lists/${id}`,
    errorMsg,
    options,
  );
};
