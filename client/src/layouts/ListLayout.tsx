import { deleteListFromDB, editListInDB } from '@/api/lists';
import { addTaskToDB } from '@/api/tasks';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TaskLayout } from '@/components/TaskLayout';
import { addTask, updateList } from '@/helpers/helpers';
import { List, Task, User } from '@/types';
import { useClickOutside } from '@/utils/useClickOutside';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ListLayoutProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  lists: List[];
  user: User;
};

type Inputs = {
  listName: string;
};

export const ListLayout = ({
  user,
  list,
  lists,
  setLists,
}: ListLayoutProps) => {
  const [showInput, setShowInput] = useState(false);
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

  // Task functions
  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        name: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    setShowInput(false);
  };

  // List functions
  const handleListInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const id = list._id;
    setLists((prevLists) => {
      const editedList = updateList(prevLists, newName, id);
      return editedList;
    });
  };

  // List edit input context, this makes it save the user changes on outside clicks
  const { ref, isVisible, setIsVisible } = useClickOutside(() => {
    editListInDB(list.name, list._id);
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    editListInDB(list.name, list._id);
    setIsVisible(!isVisible);
  };

  const handleListDelete = (id: string) => {
    deleteListFromDB(id);
    setLists((prevLists) => prevLists.filter((list) => list._id !== id));
  };

  return (
    <div className="relative mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border">
      <div className="flex justify-between px-4 pt-3">
        {isVisible ? (
          <form
            ref={ref as React.RefObject<HTMLFormElement>}
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors.listName && (
              <span className="text-red-600">
                The list name must contain at least one character.
              </span>
            )}
            <Input
              value={list.name}
              onChange={handleListInputChange}
              placeholder={'Edit the list name'}
              register={register}
              label="listName"
            />
          </form>
        ) : (
          <h3
            className="cursor-pointer text-sm font-semibold"
            onClick={() => setIsVisible(!isVisible)}
          >
            {list.name}
          </h3>
        )}
        <button onClick={() => handleListDelete(list._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {list.tasks.length > 0 && (
        <div>
          {list.tasks.map((task, i) => (
            <TaskLayout
              key={i}
              task={task}
              listId={list._id}
              setLists={setLists}
            />
          ))}
        </div>
      )}
      {showInput ? (
        <form
          className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
          onSubmit={handleTaskSubmit}
        >
          <Input
            value={task.name}
            onChange={handleTaskInputChange}
            placeholder={'Enter the task name'}
          />
          <div className="flex gap-2 text-sm">
            <Button styling="primary" type="submit">
              Add Task
            </Button>
            <Button
              styling="secondary"
              type="button"
              onClick={() => {
                setTask({
                  _id: '',
                  name: '',
                  status: false,
                });
                setShowInput(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button styling="ghost" onClick={() => setShowInput(!showInput)}>
          <PlusIcon className="h-4 w-4" />
          Add a new task
        </Button>
      )}
    </div>
  );
};
