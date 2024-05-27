import { deleteListFromDB } from '@/api/lists';
import { TaskLayout } from '@/components/TaskLayout';
import { List, User } from '@/types';
import { TrashIcon } from '@heroicons/react/24/outline';
import { AddTaskForm } from '@/components/AddTaskForm';
import { EditListForm } from '@/components/EditListForm';

type ListLayoutProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  lists: List[];
  user: User;
};

export const ListLayout = ({
  user,
  list,
  lists,
  setLists,
}: ListLayoutProps) => {
  const handleListDelete = (id: string) => {
    deleteListFromDB(id);
    setLists((prevLists) => prevLists.filter((list) => list._id !== id));
  };

  return (
    <div className="relative mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border">
      <div className="flex justify-between px-4 pt-3">
        <EditListForm
          list={list}
          lists={lists}
          setLists={setLists}
          user={user}
        />
        <button onClick={() => handleListDelete(list._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {list.tasks.length > 0 && (
        <div>
          {list.tasks.map((task, i) => (
            <TaskLayout
              key={i}
              task={task}
              listId={list._id}
              setLists={setLists}
            />
          ))}
        </div>
      )}
      <AddTaskForm list={list} lists={lists} setLists={setLists} user={user} />
    </div>
  );
};
