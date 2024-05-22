import { List, Task } from '@/types';

export const getLists = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      credentials: 'include',
    });
    const data = await res.json();
    return data as List[];
  } catch (err) {
    console.error(err);
  }
};

export const createList = async (list: List) => {
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
    console.error(err);
  }
};

export const deleteList = async (id?: string) => {
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
    console.error(err);
  }
};

export const addTask = async (list: List, task: Task) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: list._id, name: task.name }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (id?: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
