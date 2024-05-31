import { useState } from 'react';
import { addTaskToDB, deleteTaskFromDB, editTaskInDB } from '@/api/tasks';
import { List, Task } from '@/types';
import { addTask, deleteTask, updateTask } from '@/helpers/taskHelpers';

export const useTaskOperations = (
  listId: string,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  existingTask?: Task,
) => {
  const [task, setTask] = useState<Task>(
    existingTask || { _id: '', name: '', status: false },
  );

  const handleTaskDelete = async (taskId: string) => {
    setLists((prevLists) => deleteTask(prevLists, listId, taskId));
    await deleteTaskFromDB(taskId);
  };

  const handleTaskStatusChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const status = e.target.checked;
    setLists((prevLists) =>
      updateTask(prevLists, task.name, listId, task._id, status),
    );
    await editTaskInDB(task.name, task._id, status);
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({ ...prevTask, name: e.target.value }));
    if (existingTask) {
      setLists((prevLists: List[]) =>
        updateTask(prevLists, e.target.value, listId, task._id, task.status),
      );
    }
  };

  const handleTaskEdit = async (task: Task) => {
    await editTaskInDB(task.name, task._id, task.status);
  };

  const handleTaskSubmit = async (list: List, task: Task) => {
    const response = await addTaskToDB(list, task);
    setLists((prevLists) => addTask(prevLists, response, listId));
    handleReset();
  };

  const handleReset = () => {
    setTask({ _id: '', name: '', status: false });
  };

  return {
    task,
    handleTaskDelete,
    handleTaskStatusChange,
    handleTaskInputChange,
    handleTaskEdit,
    handleTaskSubmit,
    handleReset,
  };
};
