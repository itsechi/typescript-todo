import { deleteList, editList } from '@/api/lists';
import { addTaskToDB } from '@/api/tasks';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tasks } from '@/components/Tasks';
import { addTask } from '@/helpers/helpers';
import { List, Task, User } from '@/types';
import { useClickOutside } from '@/utils/useClickOutside';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
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
  const { ref, isVisible, setIsVisible } = useClickOutside(); // List edit input context
  const [task, setTask] = useState<Task>({
    name: '',
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        name: e.target.value,
      };
    });
  };

  const handleTaskSubmit = async (task: Task, id?: string) => {
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

  const handleListDelete = (id?: string) => {
    deleteList(id);
    setLists((prevLists) => prevLists.filter((list) => list._id !== id));
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const id = list._id;
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list._id === id)
          return {
            ...list,
            listTitle: newName,
          };
        else return list;
      });
    });
  };

  const handleListEditSubmit = (e) => {
    e.preventDefault();
    editList(list.listTitle, list._id);
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border">
      <div className="flex justify-between px-4 pt-3">
        {isVisible ? (
          <form ref={ref} onSubmit={handleListEditSubmit}>
            <Input
              value={list.listTitle}
              name={'list'}
              onChange={handleListNameChange}
              placeholder={'Edit the list name'}
            />
          </form>
        ) : (
          <h3
            className="cursor-pointer text-sm font-semibold"
            onClick={() => setIsVisible(!isVisible)}
          >
            {list.listTitle}
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
              name: '',
              status: false,
            });
            setShowInput(false);
          }}
        >
          <Input
            value={task.name}
            name={'task'}
            onChange={handleChange}
            placeholder={'Enter the task name'}
          />
          <div className="flex gap-2 text-sm">
            <Button styling="primary">Add Task</Button>
            <Button
              styling="secondary"
              type="button"
              onClick={() => setShowInput(false)}
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
