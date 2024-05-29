import { addTaskToDB, editTaskInDB } from '@/api/tasks';
import { addTask, updateTask } from '@/helpers';
import { List, Task, User } from '@/types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useClickOutside } from './useClickOutside';

type Inputs = {
  listName: string;
  taskName: string;
};

export const useTaskForm = (
  list: List,
  lists: List[],
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  user: User,
) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [task, setTask] = useState<Task>({
    _id: '',
    name: '',
    status: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const resetTaskForm = () => {
    setTask({
      _id: '',
      name: '',
      status: false,
    });
    setShowTaskInput(false);
    reset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        name: e.target.value,
      };
    });
  };

  const handleTaskSubmit: SubmitHandler<Inputs> = async () => {
    const id = list._id;
    const currentList = lists.find((list) => list._id === id) as List;
    // User logged in
    if (user) {
      const response = await addTaskToDB(currentList, task);
      setLists((prevLists) => {
        const editedList = addTask(prevLists, response, id);
        return editedList;
      });
    } else {
      // Local storage
      setLists((prevLists) => {
        const editedList = addTask(prevLists, task, id);
        return editedList;
      });
    }
    resetTaskForm();
    setShowTaskInput(false);
  };

  return {
    task,
    showTaskInput,
    setShowTaskInput,
    handleInputChange,
    handleSubmit,
    handleTaskSubmit,
    resetTaskForm,
    errors,
    register,
  };
};

export const useEditTaskForm = (
  task: Task,
  listId: string,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) => {
  // Task edit input context, this makes it save the user changes on outside clicks
  const { ref, isVisible, setIsVisible } = useClickOutside(() => {
    editTaskInDB(task.name, task._id, task.status);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleTaskEdit = () => {
    editTaskInDB(task.name, task._id, task.status);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const taskId = task._id;
    setLists((prevLists: List[]) => {
      const editedList = updateTask(
        prevLists,
        newName,
        listId,
        taskId,
        task.status,
      );
      return editedList;
    });
  };

  return {
    ref,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleTaskEdit,
    handleSubmit,
    register,
    errors,
  };
};
