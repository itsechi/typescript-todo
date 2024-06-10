import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { addTaskToDB, deleteTaskFromDB, editTaskInDB } from '@/api/tasks';
import { List, Task } from '@/types';
import {
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from '@/helpers/taskHelpers';
import { useListStore, useUserStore } from './useContext';

export const useTaskOperations = (listId: string, existingTask?: Task) => {
  const [currentTask, setCurrentTask] = useState<Task>(
    existingTask || { _id: '', name: '', status: false },
  );
  const [originalTaskName, setOriginalTaskName] = useState(currentTask.name);
  const { user } = useUserStore();
  const { setLists } = useListStore();

  const handleTaskDelete = async (taskId: string) => {
    setLists((prevLists) => deleteTask(prevLists, listId, taskId));
    if (user) await deleteTaskFromDB(taskId);
  };

  const handleTaskStatusChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const status = e.target.checked;
    setLists((prevLists) =>
      updateTaskStatus(prevLists, listId, currentTask._id, status),
    );
    if (user) await editTaskInDB(currentTask._id, undefined, status);
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask((prevTask) => ({ ...prevTask, name: e.target.value }));
    if (existingTask) {
      setLists((prevLists: List[]) =>
        updateTask(
          prevLists,
          e.target.value,
          listId,
          currentTask._id,
          currentTask.status,
        ),
      );
    }
  };

  const handleTaskEdit = async (task: Task) => {
    if (user) await editTaskInDB(task._id, task.name, task.status);
  };

  const handleTaskSubmit = async (list: List, task: Task) => {
    const newTask = {
      ...task,
      _id: user ? '' : uuidv4(),
    };
    // User logged in
    if (user) {
      const response = await addTaskToDB(list, newTask);
      setLists((prevLists) => addTask(prevLists, response, listId));
    } else {
      // Local storage
      setLists((prevLists) => addTask(prevLists, newTask, listId));
    }
    handleReset();
  };

  const handleReset = () => {
    setCurrentTask({ _id: '', name: '', status: false });
    setOriginalTaskName('');
  };

  const handleCancel = () => {
    setCurrentTask((prevTask) => ({ ...prevTask, name: originalTaskName }));
    setLists((prevLists: List[]) =>
      updateTask(
        prevLists,
        originalTaskName,
        listId,
        currentTask._id,
        currentTask.status,
      ),
    );
  };

  return {
    currentTask,
    handleTaskDelete,
    handleTaskStatusChange,
    handleTaskInputChange,
    handleTaskEdit,
    handleTaskSubmit,
    handleReset,
    handleCancel,
  };
};
