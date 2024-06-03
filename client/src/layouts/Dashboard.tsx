import { useEffect } from 'react';
import { getListsFromDB } from '@/api/lists';
import { ListLayout } from '@/components/ListLayout';
import { ListForm } from '@/components/ListForm';
import { useListStore } from '@/hooks/useContext';

const Dashboard = () => {
  const { lists, setLists } = useListStore();

  useEffect(() => {
    const fetchLists = async () => {
      const response = await getListsFromDB();
      setLists(response || []);
    };
    fetchLists();
  }, [setLists]);

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-responsive items-start gap-2">
          {lists.map((list) => (
            <ListLayout key={list._id} currentList={list} />
          ))}
          <ListForm />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
