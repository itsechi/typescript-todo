import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserLists } from '@/components/UserLists';
import { List } from '@/types';

const Dashboard = () => {
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL)
      .then(res => {
        setLists(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL, { listTitle })
      .then(res => {
        setLists(prevLists => [...prevLists, res.data.newList]);
        setListTitle('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <main className="dark:bg-night-bg h-[calc(100vh-60px)] p-4 text-black dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid-cols-responsive grid gap-2">
          <UserLists lists={lists} />
          {showInput ? (
            <form
              className="dark:border-night-border mt-4 flex flex-col gap-2 rounded-md border p-4"
              onSubmit={handleSubmit}
            >
              <input
                className="bg-hover focus:outline-primary dark:border-night-border dark:bg-night-hover dark:focus:outline-primary rounded-lg border px-2 py-1.5 text-sm dark:focus:outline-none"
                type="text"
                placeholder="Enter the list name"
                value={listTitle}
                onChange={handleChange}
              />
              <div className="flex gap-2 text-sm">
                <button
                  className="bg-primary hover:bg-hover-primary dark:bg-primary rounded-lg px-4 py-2 font-semibold text-white
              "
                >
                  Add List
                </button>
                <button
                  type="button"
                  className="hover:bg-hover dark:border-night-border  dark:bg-night-bg dark:text-night-gray-text dark:hover:bg-night-nav rounded-md  border  bg-white px-4 py-2 font-semibold shadow-sm"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowInput(!showInput)}
              className="bg-hover hover:bg-border  dark:border-night-border dark:bg-night-nav dark:text-night-gray-text dark:hover:bg-night-hover  mt-4 flex items-center gap-2  rounded-md  border px-4 py-2 text-sm font-semibold shadow-sm"
            >
              <PlusIcon className="h-4 w-4" />
              {lists.length > 0 ? 'Add a new list' : 'Add your first list'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
