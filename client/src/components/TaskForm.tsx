import { useForm, SubmitHandler } from 'react-hook-form';
import { Task, List, Inputs } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

type TaskFormProps = {
  currentList: List;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  currentTask?: Task;
};

export const TaskForm = ({
  currentList,
  setIsVisible,
  currentTask: existingTask,
}: TaskFormProps) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const {
    currentTask,
    handleTaskInputChange,
    handleTaskSubmit,
    handleTaskEdit,
    handleReset,
    handleCancel,
  } = useTaskOperations(currentList._id, existingTask);

  const isEditing = !!existingTask;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: isEditing ? 'onBlur' : 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleTaskSubmit(currentList, currentTask);
    resetForm();
  };

  const resetForm = () => {
    handleReset();
    setShowTaskInput(false);
    reset();
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isEditing && e.key === 'Escape') {
        handleCancel();
        setIsVisible!(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, handleCancel, setIsVisible]);

  const AddForm = showTaskInput ? (
    <form
      className="flex flex-col gap-2 rounded-md p-4 pt-1 dark:border-night-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="taskName"
        value={currentTask.name}
        onChange={handleTaskInputChange}
        placeholder={'Enter the task name'}
        register={register}
      />
      {errors.taskName && (
        <span className="text-sm text-error">
          The task name must contain at least one character.
        </span>
      )}
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
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(() => {
        handleTaskEdit(currentTask);
        setIsVisible!(false);
      })}
    >
      <Input
        value={currentTask.name}
        label={'taskName'}
        onChange={handleTaskInputChange}
        placeholder={'Edit the task name'}
        register={register}
      />
      {errors.taskName && (
        <span className="text-sm text-error">
          The task name must contain at least one character.
        </span>
      )}
    </form>
  );

  return isEditing ? EditForm : AddForm;
};
