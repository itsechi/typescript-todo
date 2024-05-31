import { TrashIcon } from '@heroicons/react/24/outline';
import { List, User } from '@/types';
import { useListOperations } from '@/hooks/useListOperations';
import { useClickOutside } from '@/hooks/useClickOutside';
import { TaskLayout } from '@/components/TaskLayout';
import { TaskForm } from './TaskForm';
import { ListForm } from './ListForm';

type ListLayoutProps = {
  currentList: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  lists: List[];
  user: User;
};

export const ListLayout = ({
  user,
  currentList,
  lists,
  setLists,
}: ListLayoutProps) => {
  const { handleListEdit, handleListDelete } = useListOperations(
    user,
    setLists,
    currentList,
  );
  const { ref, isVisible, setIsVisible } = useClickOutside(
    () => handleListEdit(currentList),
    currentList.name,
  );

  return (
    <div className="relative mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border">
      <div className="flex justify-between px-4 pt-3">
        {isVisible ? (
          <div ref={ref as React.RefObject<HTMLDivElement>}>
            <ListForm
              user={user}
              currentList={currentList}
              setLists={setLists}
              lists={lists}
              setIsVisible={setIsVisible}
            />
          </div>
        ) : (
          <h3
            className="cursor-pointer text-sm font-semibold"
            onClick={() => setIsVisible(!isVisible)}
          >
            {currentList.name}
          </h3>
        )}
        <button onClick={() => handleListDelete(currentList._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {currentList.tasks.length > 0 && (
        <div>
          {currentList.tasks.map((task) => (
            <TaskLayout
              key={task._id}
              currentTask={task}
              currentList={currentList}
              setLists={setLists}
            />
          ))}
        </div>
      )}
      <TaskForm currentList={currentList} setLists={setLists} />
    </div>
  );
};
