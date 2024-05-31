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

export const editTaskInDB = async (
  taskId: string,
  name?: string,
  status?: boolean,
) => {
  try {
    const bodyData: { [key: string]: string | boolean | undefined } = {
      taskId,
      name: name || undefined,
      status: status || undefined,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(`Error editing the task: ${err}`);
  }
};
