import { List } from '@/types';

export const getListsFromDB = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      credentials: 'include',
    });
    const data = await res.json();
    return data as List[];
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
        listTitle: list.listTitle,
        tasks: list.tasks,
      }),
    });
    const json = await res.json();
    return json;
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
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`Error deleting the list: ${err}`);
  }
};

export const editListInDB = async (listTitle: string, id: string) => {
  console.log(listTitle, id);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listTitle, id }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`Error editing the list: ${err}`);
  }
};
