import { List, Task } from '@/types';
import { apiRequest } from './api';

const token = localStorage.getItem('token');

export const addTaskToDB = async (list: List, task: Task): Promise<Task> => {
  const errorMsg = `Failed to add the task to the DB`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: list._id,
      name: task.name,
      status: task.status,
    }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/tasks`,
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/tasks/${id}`,
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/tasks/${taskId}`,
    errorMsg,
    options,
  );
};
