import { List, Task } from '@/types';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TaskForm } from './TaskForm';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTaskOperations } from '@/hooks/useTaskOperations';

type TaskLayoutProps = {
  list: List;
  task: Task;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

export const TaskLayout = ({ task, list, setLists }: TaskLayoutProps) => {
  const { handleTaskStatusChange, handleTaskEdit, handleTaskDelete } =
    useTaskOperations(list._id, setLists, task);

  const { ref, isVisible, setIsVisible } = useClickOutside(
    () => handleTaskEdit(task),
    task.name,
  );

  return (
    <div className="group mt-2 flex items-center justify-between px-4 text-sm">
      {isVisible ? (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <TaskForm
            task={task}
            list={list}
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
              checked={task.status}
              onChange={handleTaskStatusChange}
            />
            {task.name}
          </label>
          <div>
            <button onClick={() => setIsVisible(!isVisible)}>
              <PencilSquareIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
            <button onClick={() => handleTaskDelete(task._id)}>
              <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
