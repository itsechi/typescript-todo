import { useTaskForm } from '@/hooks/useTaskForm';
import { Input } from './Input';
import { Button } from './Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { List, User } from '@/types';

type TaskFormProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  lists: List[];
  user: User;
};

export const AddTaskForm = ({ list, lists, setLists, user }: TaskFormProps) => {
  const {
    task,
    showTaskInput,
    setShowTaskInput,
    handleInputChange,
    handleSubmit,
    handleTaskSubmit,
    resetTaskForm,
    errors,
    register,
  } = useTaskForm(list, lists, setLists, user);

  return showTaskInput ? (
    <form
      className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
      onSubmit={handleSubmit(handleTaskSubmit)}
    >
      {errors.taskName && (
        <span className="text-red-600">
          The task name must contain at least one character.
        </span>
      )}
      <Input
        label="taskName"
        value={task.name}
        onChange={handleInputChange}
        placeholder={'Enter the task name'}
        register={register}
      />
      <div className="flex gap-2 text-sm">
        <Button styling="primary" type="submit">
          Add Task
        </Button>
        <Button styling="secondary" type="button" onClick={resetTaskForm}>
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <Button styling="ghost" onClick={() => setShowTaskInput(!showTaskInput)}>
      <PlusIcon className="h-4 w-4" />
      Add a new task
    </Button>
  );
};
