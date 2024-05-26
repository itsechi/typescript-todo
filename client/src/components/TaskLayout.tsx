import { deleteTaskFromDB, editTaskInDB } from '@/api/tasks';
import { deleteTask, updateTask } from '@/helpers/helpers';
import { List, Task } from '@/types';
import { useClickOutside } from '@/utils/useClickOutside';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from './Input';

type TaskLayoutProps = {
  listId: string;
  task: Task;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

export const TaskLayout = ({ task, listId, setLists }: TaskLayoutProps) => {
  const handleTaskDelete = (taskId: string, listId: string) => {
    deleteTaskFromDB(taskId);
    setLists((prevLists) => {
      const editedLists = deleteTask(prevLists, listId, taskId);
      return editedLists;
    });
  };

  // Edit this in the future and instead create a single function that takes care of any updates of the tasks
  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    listId: string,
  ) => {
    const status = e.target.checked;
    editTaskInDB(task.name, task._id, status);
    setLists((prevLists) => {
      const editedLists = updateTask(
        prevLists,
        task.name,
        listId,
        taskId,
        status,
      );
      return editedLists;
    });
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const taskId = task._id;
    setLists((prevLists) => {
      const editedList = updateTask(
        prevLists,
        newName,
        listId,
        taskId,
        task.status,
      );
      return editedList;
    });
  };

  // List edit input context, this makes it save the user changes on outside clicks
  const { ref, isVisible, setIsVisible } = useClickOutside(() => {
    editTaskInDB(task.name, task._id, task.status);
  });

  const handleTaskEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editTaskInDB(task.name, task._id, task.status);
    setIsVisible(!isVisible);
  };

  return (
    <div className="group mt-2 flex items-center justify-between px-4 text-sm">
      {isVisible ? (
        <form
          ref={ref as React.RefObject<HTMLFormElement>}
          onSubmit={handleTaskEdit}
        >
          <Input
            value={task.name}
            name={'task'}
            onChange={handleTaskInputChange}
            placeholder={'Edit the task name'}
          />
        </form>
      ) : (
        <label className="flex items-center">
          <input
            className="mr-2 h-4 w-4 rounded border-border-dark bg-hover text-primary focus:ring-primary    dark:border-night-border dark:bg-gray-700 focus:dark:ring-offset-night-bg"
            type="checkbox"
            checked={task.status}
            onChange={(e) => handleStatusChange(e, task._id, listId)}
          />
          {task.name}
        </label>
      )}
      <div>
        <button onClick={() => setIsVisible(!isVisible)}>
          <PencilSquareIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
        </button>
        <button onClick={() => handleTaskDelete(task._id, listId)}>
          <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};
