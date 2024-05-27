import { addTaskToDB } from '@/api/tasks';
import { addTask } from '@/helpers';
import { List, Task, User } from '@/types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
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

  const clearTaskInput = () => {
    setTask({
      _id: '',
      name: '',
      status: false,
    });
    setShowTaskInput(false);
    reset();
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    clearTaskInput();
    setShowTaskInput(false);
  };

  return {
    task,
    showTaskInput,
    setShowTaskInput,
    register,
    handleSubmit,
    handleTaskInputChange,
    errors,
    handleTaskSubmit,
    clearTaskInput,
  };
};
