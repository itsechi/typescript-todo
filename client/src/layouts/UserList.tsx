import { deleteListFromDB, editListInDB } from '@/api/lists';
import { addTaskToDB } from '@/api/tasks';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tasks } from '@/components/Tasks';
import { addTask, updateList } from '@/helpers/helpers';
import { List, Task, User } from '@/types';
import { useClickOutside } from '@/utils/useClickOutside';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type UserListProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  setList: React.Dispatch<React.SetStateAction<List>>;
  lists: List[];
  user: User;
};

export const UserList = ({ user, list, lists, setLists }: UserListProps) => {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState<Task>({
    _id: '',
    name: '',
    status: false,
  });

  // Task functions
  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        name: e.target.value,
      };
    });
  };

  const handleTaskSubmit = async (task: Task, id: string) => {
    const list = lists.find((list) => list._id === id) as List;
    // User logged in
    if (user) {
      const response = await addTaskToDB(list, task);
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

  const handleListEdit = (e: React.FormEvent) => {
    e.preventDefault();
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
            onSubmit={handleListEdit}
          >
            <Input
              value={list.name}
              name={'list'}
              onChange={handleListInputChange}
              placeholder={'Edit the list name'}
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
          <Tasks listId={list._id} tasks={list.tasks} setLists={setLists} />
        </div>
      )}
      {showInput ? (
        <form
          className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
          onSubmit={(e) => {
            e.preventDefault();
            handleTaskSubmit(task, list._id);
            setTask({
              _id: '',
              name: '',
              status: false,
            });
            setShowInput(false);
          }}
        >
          <Input
            value={task.name}
            name={'task'}
            onChange={handleTaskInputChange}
            placeholder={'Enter the task name'}
          />
          <div className="flex gap-2 text-sm">
            <Button styling="primary">Add Task</Button>
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
