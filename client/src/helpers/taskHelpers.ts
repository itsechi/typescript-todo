import { List, Task } from '@/types';

export const addTask = (lists: List[], task: Task, listId: string) => {
  return lists.map((list) =>
    list._id === listId ? { ...list, tasks: [...list.tasks, task] } : list,
  );
};

export const deleteTask = (lists: List[], listId: string, taskId: string) => {
  return lists.map((list) =>
    list._id === listId
      ? { ...list, tasks: list.tasks.filter((task) => task._id !== taskId) }
      : list,
  );
};

export const updateTask = (
  lists: List[],
  name: string,
  listId: string,
  taskId: string,
  status: boolean,
) => {
  return lists.map((list) =>
    list._id === listId
      ? {
          ...list,
          tasks: list.tasks.map((task) =>
            task._id === taskId ? { ...task, name, status } : task,
          ),
        }
      : list,
  );
};

export const updateTaskStatus = (
  lists: List[],
  listId: string,
  taskId: string,
  status: boolean,
) => {
  return lists.map((list) =>
    list._id === listId
      ? {
          ...list,
          tasks: list.tasks.map((task) =>
            task._id === taskId ? { ...task, status } : task,
          ),
        }
      : list,
  );
};
