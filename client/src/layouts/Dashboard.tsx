import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { createListInDB, getListsFromDB } from '@/api/lists';
import { List, User } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ListLayout } from '@/layouts/ListLayout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';

type DashboardProps = {
  user: User;
};

type Inputs = {
  listName: string;
};

const Dashboard = ({ user }: DashboardProps) => {
  const [showInput, setShowInput] = useState(false);
  const [currentList, setCurrentList] = useState<List>({
    _id: '',
    name: '',
    userId: '',
    tasks: [],
  });
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const newList = {
      ...currentList,
      _id: user ? '' : uuidv4(),
      userId: user ? user._id : '',
    };
    try {
      if (user) {
        // User logged in
        const response = await createListInDB(newList);
        setLists((prevLists) => [...prevLists, response]);
      } else {
        // Local storage
        setLists((prevLists) => [...prevLists, newList]);
      }
      resetListForm();
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };

  const resetListForm = () => {
    setCurrentList({
      _id: '',
      name: '',
      userId: '',
      tasks: [],
    });
    setShowInput(false);
  };

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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentList((prevList) => ({
      ...prevList,
      name: e.target.value,
    }));
  };

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-responsive items-start gap-2">
          {lists.map((list) => (
            <ListLayout
              key={list._id}
              list={list}
              setLists={setLists}
              lists={lists}
              user={user}
            />
          ))}
          {showInput ? (
            <form
              className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
              onSubmit={handleSubmit(onSubmit)}
            >
              {errors.listName && (
                <span className="text-red-600">
                  The list name must contain at least one character.
                </span>
              )}
              <Input
                value={currentList.name}
                register={register}
                onChange={handleInputChange}
                placeholder="Enter the list name"
                label="listName"
              />
              <div className="flex gap-2 text-sm">
                <Button type="submit" styling="primary">
                  Add List
                </Button>
                <Button
                  type="button"
                  onClick={resetListForm}
                  styling="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button styling="tertiary" onClick={() => setShowInput(true)}>
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
