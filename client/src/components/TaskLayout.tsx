import { List, Task } from '@/types';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TaskForm } from './TaskForm';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTaskOperations } from '@/hooks/useTaskOperations';

type TaskLayoutProps = {
  color: string;
  currentTask: Task;
  currentList: List;
  changeProgress: () => void;
};

export const TaskLayout = ({
  color,
  currentTask,
  currentList,
  changeProgress,
}: TaskLayoutProps) => {
  const { handleTaskStatusChange, handleTaskEdit, handleTaskDelete } =
    useTaskOperations(currentList._id, currentTask);

  const { ref, isVisible, setIsVisible } = useClickOutside(
    () => handleTaskEdit(currentTask),
    currentTask.name,
  );

  return (
    <div className="group mt-2 flex w-full items-center justify-between px-4 text-sm">
      {isVisible ? (
        <div className="w-full" ref={ref as React.RefObject<HTMLDivElement>}>
          <TaskForm
            currentTask={currentTask}
            currentList={currentList}
            setIsVisible={setIsVisible}
          />
        </div>
      ) : (
        <div className="flex w-full justify-between">
          <label className="flex w-3/4 items-center">
            <input
              className="dark:border-night-gray-200 mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-gray-300 dark:bg-gray-700 focus:dark:ring-gray-700 focus:dark:ring-offset-night-gray-900"
              style={{
                color: `${color}`,
              }}
              type="checkbox"
              checked={currentTask.status}
              onChange={handleTaskStatusChange}
              onClick={changeProgress}
            />
            <span className="w-3/4 overflow-hidden text-ellipsis whitespace-nowrap">
              {currentTask.name}
            </span>
          </label>
          <div className="flex">
            <button onClick={() => setIsVisible(!isVisible)}>
              <PencilSquareIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
            <button onClick={() => handleTaskDelete(currentTask._id)}>
              <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
