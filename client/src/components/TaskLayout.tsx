import { List, Task } from '@/types';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TaskForm } from './TaskForm';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTaskOperations } from '@/hooks/useTaskOperations';

type TaskLayoutProps = {
  currentTask: Task;
  currentList: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

export const TaskLayout = ({
  currentTask,
  currentList,
  setLists,
}: TaskLayoutProps) => {
  const { handleTaskStatusChange, handleTaskEdit, handleTaskDelete } =
    useTaskOperations(currentList._id, setLists, currentTask);

  const { ref, isVisible, setIsVisible } = useClickOutside(
    () => handleTaskEdit(currentTask),
    currentTask.name,
  );

  return (
    <div className="group mt-2 flex items-center justify-between px-4 text-sm">
      {isVisible ? (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <TaskForm
            currentTask={currentTask}
            currentList={currentList}
            setLists={setLists}
            setIsVisible={setIsVisible}
          />
        </div>
      ) : (
        <>
          <label className="flex items-center">
            <input
              className="mr-2 h-4 w-4 rounded border-border-dark bg-hover text-primary focus:ring-primary    dark:border-night-border dark:bg-gray-700 focus:dark:ring-offset-night-bg"
              type="checkbox"
              checked={currentTask.status}
              onChange={handleTaskStatusChange}
            />
            {currentTask.name}
          </label>
          <div>
            <button onClick={() => setIsVisible(!isVisible)}>
              <PencilSquareIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
            <button onClick={() => handleTaskDelete(currentTask._id)}>
              <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
