import { List, Task } from '@/types';

export const addTask = (lists: List[], task: Task, id?: string) => {
  return lists.map((list) => {
    if (list._id === id) list.tasks.push(task);
    return list;
  });
};

export const deleteTask = (lists: List[], listId?: string, taskId?: string) => {
  return lists.map((list) => {
    if (list._id === listId) {
      return {
        ...list,
        tasks: list.tasks.filter((task) => task._id !== taskId),
      };
    } else return list;
  });
};

// fix this to make it update the entire task not just the status
export const updateTaskStatus = (
  lists: List[],
  status: boolean,
  listId?: string,
  taskId?: string,
) => {
  return lists.map((list) => {
    if (list._id === listId) {
      return {
        ...list,
        tasks: list.tasks.map((task) => {
          if (task._id === taskId) {
            return {
              ...task,
              status,
            };
          } else return task;
        }),
      };
    } else return list;
  });
};
