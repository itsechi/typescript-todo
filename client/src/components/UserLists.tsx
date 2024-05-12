import { List, Task } from '@/types';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type ListsProps = {
  lists: List[];
  deleteList: (id?: string) => void;
  handleAddTask: (task: Task, id?: string) => void;
};

export const UserLists = ({ lists, deleteList, handleAddTask }: ListsProps) => {
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

  return lists.map((list, i) => (
    <div
      key={i}
      className="mt-4 flex flex-col gap-2 rounded-md border dark:border-night-border"
    >
      <div className="flex justify-between px-4 pt-3">
        <h3 className="font-semibold text-sm">{list.listTitle}</h3>
        <button onClick={() => deleteList(list._id)}>
          <TrashIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
      {list.tasks.length > 0 && list.tasks.map((task) => <Tasks task={task} />)}
      {showInput ? (
        <form
          className="dark:border-night-border flex flex-col gap-2 rounded-md p-4 pt-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask(task, list._id);
          }}
        >
          <input
            className="bg-hover focus:outline-primary dark:border-night-border dark:bg-night-hover dark:focus:outline-primary rounded-lg border px-2 py-1.5 text-sm dark:focus:outline-none"
            type="text"
            placeholder="Enter the list name"
            value={task.name}
            onChange={handleChange}
            name="task"
          />
          <div className="flex gap-2 text-sm">
            <button
              className="bg-primary hover:bg-hover-primary dark:bg-primary rounded-lg px-4 py-2 font-semibold text-white
              "
            >
              Add List
            </button>
            <button
              type="button"
              className="hover:bg-hover dark:border-night-border  dark:bg-night-bg dark:text-night-gray-text dark:hover:bg-night-nav rounded-md  border  bg-white px-4 py-2 font-semibold shadow-sm"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-2 text-sm hover:bg-hover dark:hover:bg-night-nav px-4 py-2 rounded-md"
        >
          <PlusIcon className="h-4 w-4" />
          Add a new task
        </button>
      )}
    </div>
  ));
};

type TasksProps = {
  task: Task;
};

export const Tasks = ({ task }: TasksProps) => {
  return <div>{task.name}</div>;
};
