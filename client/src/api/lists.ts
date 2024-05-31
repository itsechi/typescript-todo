import { List } from '@/types';

export const getListsFromDB = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      credentials: 'include',
    });
    return (await res.json()) as List[];
  } catch (err) {
    console.error(`Error getting the lists from the DB: ${err}`);
  }
};

export const createListInDB = async (list: List) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: list.userId,
        name: list.name,
        tasks: list.tasks,
      }),
    });
    return await res.json();
  } catch (err) {
    console.error(`Error creating the list: ${err}`);
  }
};

export const deleteListFromDB = async (id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}lists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    return await res.json();
  } catch (err) {
    console.error(`Error deleting the list: ${err}`);
  }
};

export const editListInDB = async (name: string, id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, id }),
    });
    return await res.json();
  } catch (err) {
    console.error(`Error editing the list: ${err}`);
  }
};
