import { List } from '@/types';

export const getLists = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL);
    const data = await res.json();
    return data as List[];
  } catch (err) {
    console.error(err);
  }
};

export const createList = async (listTitle: string) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listTitle }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
