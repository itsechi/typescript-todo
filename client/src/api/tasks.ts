import { List, Task } from '@/types';

export const addTaskToDB = async (list: List, task: Task) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: list._id,
        name: task.name,
        status: task.status,
      }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`Error adding the tasks to the DB: ${err}`);
  }
};

export const deleteTaskFromDB = async (id: string) => {
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
    console.error(`Error deleting the tasks from the DB: ${err}`);
  }
};

export const updateTaskStatusInDB = async (
  status: boolean,
  taskId: string,
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        status,
      }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`Error updating the tasks in the DB: ${err}`);
  }
};
