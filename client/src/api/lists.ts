import { List } from '@/types';
import { apiRequest } from './api';

export const getListsFromDB = async (): Promise<List[]> => {
  const errorMsg = `Failed to fetch lists from the DB`;
  const options = { credentials: 'include' } as RequestInit;
  return await apiRequest(`${import.meta.env.VITE_API_URL}`, errorMsg, options);
};

export const createListInDB = async (list: List): Promise<List> => {
  const errorMsg = `Failed to create the list in the DB`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(list)
    body: JSON.stringify({
      userId: list.userId,
      name: list.name,
      tasks: list.tasks,
    }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}lists`,
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
    },
    body: JSON.stringify({ id }),
  };
  await apiRequest(
    `${import.meta.env.VITE_API_URL}lists/${id}`,
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
    },
    body: JSON.stringify({ name, id }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}lists/${id}`,
    errorMsg,
    options,
  );
};
