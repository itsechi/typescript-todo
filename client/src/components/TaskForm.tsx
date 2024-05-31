import { useForm, SubmitHandler } from 'react-hook-form';
import { Task, List, Inputs } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

type TaskFormProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  task?: Task;
};

export const TaskForm = ({
  list,
  setLists,
  setIsVisible,
  task: existingTask,
}: TaskFormProps) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const {
    task,
    handleTaskInputChange,
    handleTaskSubmit,
    handleTaskEdit,
    handleReset,
  } = useTaskOperations(list._id, setLists, existingTask);

  const isEditing = !!existingTask;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: isEditing ? 'onBlur' : 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleTaskSubmit(list, task);
    resetForm();
  };

  const resetForm = () => {
    handleReset();
    setShowTaskInput(false);
    reset();
  };

  const AddForm = showTaskInput ? (
    <form
      className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.taskName && (
        <span className="text-red-600">
          The task name must contain at least one character.
        </span>
      )}
      <Input
        label="taskName"
        value={task.name}
        onChange={handleTaskInputChange}
        placeholder={'Enter the task name'}
        register={register}
      />
      <div className="flex gap-2 text-sm">
        <Button styling="primary" type="submit">
          Add Task
        </Button>
        <Button styling="secondary" type="button" onClick={resetForm}>
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <Button styling="ghost" onClick={() => setShowTaskInput(true)}>
      <PlusIcon className="h-4 w-4" />
      Add a new task
    </Button>
  );

  const EditForm = (
    <form
      onSubmit={handleSubmit(() => {
        handleTaskEdit(task);
        setIsVisible!(false);
      })}
    >
      {errors.taskName && (
        <span className="text-red-600">
          The task name must contain at least one character.
        </span>
      )}
      <Input
        value={task.name}
        label={'taskName'}
        onChange={handleTaskInputChange}
        placeholder={'Edit the task name'}
        register={register}
      />
    </form>
  );

  return isEditing ? EditForm : AddForm;
};
