import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { createListInDB, getListsFromDB } from '@/api/lists';
import { List, User } from '@/types';
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
    _id: '',
    listTitle: '',
    userId: '',
    tasks: [],
  });
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);

  useEffect(() => {
    // Get lists from the db and set them in state
    const handleFetchData = async () => {
      const response = (await getListsFromDB()) || [];
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

  const handleListSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = {
      ...list,
      _id: user ? '' : uuidv4(),
      userId: user ? user._id : '',
    };
    if (user) {
      // User logged in
      const response = await createListInDB(updatedList);
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
                setLists={setLists}
                setList={setList}
                lists={lists}
                user={user}
              />
            ))}
          {showInput ? (
            <form
              className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
              onSubmit={handleListSubmit}
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
