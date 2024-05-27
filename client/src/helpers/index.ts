import { List, Task } from '@/types';

export const addTask = (lists: List[], task: Task, id: string) => {
  return lists.map((list) => {
    if (list._id === id) list.tasks.push(task);
    return list;
  });
};

export const deleteTask = (lists: List[], listId: string, taskId: string) => {
  return lists.map((list) => {
    if (list._id === listId) {
      return {
        ...list,
        tasks: list.tasks.filter((task) => task._id !== taskId),
      };
    } else return list;
  });
};

export const updateList = (lists: List[], newName: string, id: string) => {
  return lists.map((list) => {
    if (list._id === id)
      return {
        ...list,
        name: newName,
      };
    else return list;
  });
};

export const updateTask = (
  lists: List[],
  newName: string,
  listId: string,
  taskId: string,
  status: boolean,
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
              name: newName,
            };
          } else return task;
        }),
      };
    } else return list;
  });
};
