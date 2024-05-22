import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { List, Task } from '@/types';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type UserListProps = {
  list: List;
  deleteList: (id?: string) => void;
  handleAddTask: (task: Task, id?: string) => void;
  handleTaskDelete: (id?: string, listId?: string) => void;
};

export const UserList = ({
  list,
  deleteList,
  handleAddTask,
  handleTaskDelete,
}: UserListProps) => {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState<Task>({
    name: '',
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        name: e.target.value,
      };
    });
  };

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border">
      <div className="flex justify-between px-4 pt-3">
        <h3 className="text-sm font-semibold">{list.listTitle}</h3>
        <button onClick={() => deleteList(list._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {list.tasks.length > 0 && (
        <div>
          <Tasks
            listId={list._id}
            tasks={list.tasks}
            handleTaskDelete={handleTaskDelete}
          />
        </div>
      )}
      {showInput ? (
        <form
          className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask(task, list._id);
            setTask({
              name: '',
              status: false,
            });
            setShowInput(false);
          }}
        >
          <Input
            value={task.name}
            name={'task'}
            onChange={handleChange}
            placeholder={'Enter the task name'}
          />
          <div className="flex gap-2 text-sm">
            <Button styling="primary">Add Task</Button>
            <Button
              styling="secondary"
              type="button"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button styling="ghost" onClick={() => setShowInput(!showInput)}>
          <PlusIcon className="h-4 w-4" />
          Add a new task
        </Button>
      )}
    </div>
  );
};

type TasksProps = {
  listId?: string;
  tasks: Task[];
  handleTaskDelete: (id?: string, listId?: string) => void;
};

export const Tasks = ({ tasks, handleTaskDelete, listId }: TasksProps) => {
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
          onChange={handleStatusChange}
        />
        {task.name}
      </label>
      <button onClick={() => handleTaskDelete(task._id, listId)}>
        <XMarkIcon className="h-6 w-6 opacity-0 group-hover:opacity-100" />
      </button>
    </div>
  ));
};
