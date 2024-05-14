import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { List, Task } from '@/types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type UserListProps = {
  list: List;
  deleteList: (id?: string) => void;
  handleAddTask: (task: Task, id?: string) => void;
};

export const UserList = ({
  list,
  deleteList,
  handleAddTask,
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
        <h3 className="font-semibold text-sm">{list.listTitle}</h3>
        <button onClick={() => deleteList(list._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {list.tasks.length > 0 && (
        <div>
          <Tasks tasks={list.tasks} />
        </div>
      )}
      {showInput ? (
        <form
          className="dark:border-night-border flex flex-col gap-2 rounded-md p-4 pt-1"
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
  tasks: Task[];
};

export const Tasks = ({ tasks }: TasksProps) => {
  return tasks.map((task, i) => (
    <div key={i} className="px-4 text-sm mt-2">
      <label className="flex items-center">
        {' '}
        <input
          className="mr-2 w-4 h-4 text-primary bg-hover border-border-dark rounded focus:ring-primary    dark:bg-gray-700 dark:border-night-border focus:dark:ring-offset-night-bg "
          type="checkbox"
        />
        {task.name}
      </label>
    </div>
  ));
};
