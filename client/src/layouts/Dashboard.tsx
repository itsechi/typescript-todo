import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { UserLists } from '@/components/UserLists';
import { createList, getLists } from '@/api/lists';
import { List, User } from '@/types';
import { useLocalStorage } from '@/utils/useLocalStorage';

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [list, setList] = useState<List>({
    listTitle: '',
    userId: '',
  });
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);

  useEffect(() => {
    const handleFetchData = async () => {
      const response = (await getLists()) || [];
      setLists(response);
    };
    handleFetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList({
      listTitle: e.target.value,
      userId: user ? user!._id : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const response = await createList(list);
      setLists((prevLists) => [...prevLists, response]);
      setList({
        listTitle: '',
        userId: '',
      });
    } else {
      setLists((prevLists) => [...prevLists, list]);
      setList({
        listTitle: '',
        userId: '',
      });
    }
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
                value={list.listTitle}
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
