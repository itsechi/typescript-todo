import { deleteTaskFromDB, updateTaskStatusInDB } from '@/api/tasks';
import { deleteTask, updateTaskStatus } from '@/helpers/helpers';
import { List, Task } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

type TasksProps = {
  listId: string;
  tasks: Task[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

export const Tasks = ({ tasks, listId, setLists }: TasksProps) => {
  const handleTaskDelete = (taskId: string, listId: string) => {
    deleteTaskFromDB(taskId);
    setLists((prevLists) => {
      const editedLists = deleteTask(prevLists, listId, taskId);
      return editedLists;
    });
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    listId: string,
  ) => {
    const status = e.target.checked;
    updateTaskStatusInDB(status, taskId);
    setLists((prevLists) => {
      const editedLists = updateTaskStatus(prevLists, status, listId, taskId);
      return editedLists;
    });
  };

  return tasks.map((task, i) => (
    <div
      key={i}
      className="group mt-2 flex items-center justify-between px-4 text-sm"
    >
      <label className="flex items-center">
        {' '}
        <input
          className="mr-2 h-4 w-4 rounded border-border-dark bg-hover text-primary focus:ring-primary    dark:border-night-border dark:bg-gray-700 focus:dark:ring-offset-night-bg "
          type="checkbox"
          checked={task.status}
          onChange={(e) => handleStatusChange(e, task._id, listId)}
        />
        {task.name}
      </label>
      <button onClick={() => handleTaskDelete(task._id, listId)}>
        <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
      </button>
    </div>
  ));
};
