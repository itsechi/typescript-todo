import { deleteTaskFromDB, editTaskInDB } from '@/api/tasks';
import { deleteTask, updateTask } from '@/helpers';
import { List, Task } from '@/types';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { EditTaskForm } from './EditTaskForm';
import { useEditTaskForm } from '@/hooks/useTaskForm';

type TaskLayoutProps = {
  listId: string;
  task: Task;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

export const TaskLayout = ({ task, listId, setLists }: TaskLayoutProps) => {
  const { ref, isVisible, setIsVisible } = useEditTaskForm(
    task,
    listId,
    setLists,
  );

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

  return (
    <div className="group mt-2 flex items-center justify-between px-4 text-sm">
      {isVisible ? (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <EditTaskForm
            task={task}
            listId={listId}
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
              onChange={(e) => handleStatusChange(e, task._id, listId)}
            />
            {task.name}
          </label>
          <div>
            <button onClick={() => setIsVisible(!isVisible)}>
              <PencilSquareIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
            <button onClick={() => handleTaskDelete(task._id, listId)}>
              <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
