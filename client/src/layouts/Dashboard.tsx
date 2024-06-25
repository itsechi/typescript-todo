import { useEffect, useState } from 'react';
import { getListsFromDB } from '@/api/lists';
import { ListLayout } from '@/components/ListLayout';
import { ListForm } from '@/components/ListForm';
import { useListStore, useUserStore } from '@/hooks/useContext';
import { Loader } from '@/components/Loader';

const Dashboard = () => {
  const { lists, setLists } = useListStore();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      const response = await getListsFromDB();
      setLists(response || []);
      setLoading(false);
    };
    if (user) fetchLists();
  }, [setLists, user]);

  return (
    <main className="h-[calc(100vh-60px)] bg-gray-50 p-4 text-black dark:bg-night-gray-950 dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-2xl font-semibold">All tasks</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-responsive items-start gap-2">
            {lists.map((list) => (
              <ListLayout key={list._id} currentList={list} />
            ))}
            <ListForm />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
