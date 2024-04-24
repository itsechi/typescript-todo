import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Dashboard = () => {
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [lists, setLists] = useState([]);

  const handleChange = e => {
    setListTitle(e.target.value);
  };

  const handleSubmit = () => {

  };

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-responsive gap-2">
        {lists.map(list => (
          <div className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border">
            <h3 className="font-semibold text-sm">{list}</h3>
          </div>
        ))}
        {showInput ? (
          <form
            className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
            onSubmit={handleSubmit}
          >
            <input
              className="rounded-lg border bg-hover px-2 py-1.5 text-sm focus:outline-primary dark:border-night-border dark:bg-night-hover dark:focus:outline-none dark:focus:outline-primary"
              type="text"
              placeholder="Enter the list name"
              value={listTitle}
              onChange={handleChange}
            />
            <div className="flex gap-2 text-sm">
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-hover-primary dark:bg-primary
              "
                onClick={handleSubmit}
              >
                Add List
              </button>
              <button
                type="button"
                className="rounded-md border  bg-white px-4 py-2 font-semibold  shadow-sm  hover:bg-hover dark:border-night-border dark:bg-night-bg dark:text-night-gray-text dark:hover:bg-night-nav"
                onClick={() => setShowInput(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(!showInput)}
            className="mt-4 flex  items-center gap-2 rounded-md border  bg-hover px-4 py-2 text-sm  font-semibold  shadow-sm hover:bg-border dark:border-night-border dark:bg-night-nav dark:text-night-gray-text dark:hover:bg-night-hover"
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
