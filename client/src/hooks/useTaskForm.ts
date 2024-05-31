import { addTaskToDB, editTaskInDB } from '@/api/tasks';
import { addTask, updateTask } from '@/helpers';
import { Inputs, List, Task, User } from '@/types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useClickOutside } from './useClickOutside';

const initialState = {
  _id: '',
  name: '',
  status: false,
};

export const useTaskForm = (
  list: List,
  lists: List[],
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  user: User,
) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [task, setTask] = useState<Task>(initialState);

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
    setTask(initialState);
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
      setLists((prevLists) => addTask(prevLists, response, id));
    } else {
      // Local storage
      setLists((prevLists) => addTask(prevLists, task, id));
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
  }, task.name);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const handleTaskEdit = () => {
    editTaskInDB(task.name, task._id, task.status);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const taskId = task._id;
    setLists((prevLists: List[]) =>
      updateTask(prevLists, newName, listId, taskId, task.status),
    );
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
