import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  createList,
  deleteList,
  addTask,
  getLists,
  deleteTask,
} from '@/api/lists';
import { List, Task, User } from '@/types';
import { useLocalStorage } from '@/utils/useLocalStorage';
import { UserList } from '@/layouts/UserList';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

type DashboardProps = {
  user: User;
};

const Dashboard = ({ user }: DashboardProps) => {
  const [showInput, setShowInput] = useState(false);
  const [list, setList] = useState<List>({
    listTitle: '',
    userId: '',
    tasks: [],
  });
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);

  useEffect(() => {
    const handleFetchData = async () => {
      const response = (await getLists()) || [];
      setLists(response);
    };
    handleFetchData();
  }, [setLists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList((prevList) => {
      return {
        ...prevList,
        listTitle: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = {
      ...list,
      _id: user ? '' : uuidv4(),
      userId: user ? user._id : '',
    };
    if (user) {
      // User logged in
      const response = await createList(updatedList);
      setLists((prevLists) => [...prevLists, response]);
    } else {
      // Local storage
      setLists((prevLists) => [...prevLists, list]);
    }
    setList({
      _id: '',
      listTitle: '',
      userId: '',
      tasks: [],
    });
    setShowInput(false);
  };

  const handleAddTask = async (task: Task, id?: string) => {
    const list = lists.find((list) => list._id === id) as List;
    // User logged in
    if (user) {
      const response = await addTask(list, task);
      setLists((prevLists) => {
        const editedLists = prevLists.map((list) => {
          if (list._id === id) list.tasks.push(response);
          return list;
        });
        return editedLists;
      });
    } else {
      // Local storage
      setLists((prevLists) => {
        const editedLists = prevLists.map((list) => {
          if (list._id === id) list.tasks.push(task);
          return list;
        });
        return editedLists;
      });
    }
  };

  const handleDelete = (id?: string) => {
    deleteList(id);
    setLists((prevLists) => prevLists.filter((list) => list._id !== id));
  };

  const handleTaskDelete = (id?: string, listId?: string) => {
    deleteTask(id);
    setLists((prevLists) => {
      const editedLists = prevLists.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task._id !== id),
          };
        } else return list;
      });
      return editedLists;
    });
  };

  const handleStatusChange = () => {};

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-responsive items-start gap-2">
          {lists &&
            lists.map((list, i) => (
              <UserList
                key={i}
                list={list}
                deleteList={handleDelete}
                handleAddTask={handleAddTask}
                handleTaskDelete={handleTaskDelete}
              />
            ))}
          {showInput ? (
            <form
              className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
              onSubmit={handleSubmit}
            >
              <Input
                value={list.listTitle}
                name={'list'}
                onChange={handleChange}
                placeholder={'Enter the list name'}
              />
              <div className="flex gap-2 text-sm">
                <Button styling="primary">Add List</Button>
                <Button
                  type="button"
                  onClick={() => setShowInput(false)}
                  styling="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button styling="tertiary" onClick={() => setShowInput(!showInput)}>
              <PlusIcon className="h-4 w-4" />
              {lists.length > 0 ? 'Add a new list' : 'Add your first list'}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
