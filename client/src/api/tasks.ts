import { List, Task } from '@/types';
import { apiRequest } from './api';

export const addTaskToDB = async (list: List, task: Task): Promise<Task> => {
  const errorMsg = `Failed to add the task to the DB`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: list._id,
      name: task.name,
      status: task.status,
    }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}tasks`,
    errorMsg,
    options,
  );
};

export const deleteTaskFromDB = async (id: string): Promise<void> => {
  const errorMsg = `Failed to delete the task from the DB`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}tasks/${id}`,
    errorMsg,
    options,
  );
};

export const editTaskInDB = async (
  taskId: string,
  name?: string,
  status?: boolean,
): Promise<Task> => {
  const bodyData: { [key: string]: string | boolean | undefined } = {
    taskId,
    name: name || undefined,
    status: status || undefined,
  };
  const errorMsg = `Failed to edit the task in the DB`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}tasks/${taskId}`,
    errorMsg,
    options,
  );
};
