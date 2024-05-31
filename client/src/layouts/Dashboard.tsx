import { useEffect } from 'react';
import { getListsFromDB } from '@/api/lists';
import { List, User } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ListLayout } from '@/components/ListLayout';
import { ListForm } from '@/components/ListForm';

type DashboardProps = {
  user: User;
};

const Dashboard = ({ user }: DashboardProps) => {
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getListsFromDB();
        setLists(response || []);
      } catch (error) {
        console.error('Failed to fetch lists:', error);
      }
    };
    fetchLists();
  }, [setLists]);

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-responsive items-start gap-2">
          {lists.map((list) => (
            <ListLayout
              key={list._id}
              currentList={list}
              setLists={setLists}
              lists={lists}
              user={user}
            />
          ))}
          <ListForm lists={lists} setLists={setLists} user={user} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
