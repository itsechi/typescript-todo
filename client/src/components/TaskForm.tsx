import { useForm, SubmitHandler } from 'react-hook-form';
import { Task, List, Inputs } from '@/types';
import { Button } from '@/components/Button';
import { useTaskOperations } from '@/hooks/useTaskOperations';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { InputController } from './InputController';

type TaskFormProps = {
  color?: string;
  currentList: List;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  currentTask?: Task;
};

export const TaskForm = ({
  color,
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
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Inputs>({ mode: 'onChange' });

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

  // This reverts the input to the original value if the user edits the task and leaves
  // the field empty but does not submit it, just refreshes the page
  useEffect(() => {
    window.addEventListener('beforeunload', handleCancel);
    return () => {
      window.removeEventListener('beforeunload', handleCancel);
    };
  }, [handleCancel]);

  const AddForm = showTaskInput ? (
    <form
      className="dark:border-night-gray-200 flex flex-col gap-2 rounded-md p-4 pt-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputController
        name="taskName"
        control={control}
        onChange={handleTaskInputChange}
        placeholder={'Enter the task name'}
        value={currentTask.name}
      />
      {errors.taskName && (
        <span className="text-sm text-error">
          The task name must contain at least one character.
        </span>
      )}
      <div className="flex gap-2 text-sm">
        <Button styling="primary" type="submit" color={color}>
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
      <InputController
        name="taskName"
        control={control}
        onChange={handleTaskInputChange}
        value={currentTask.name}
        placeholder={'Edit the task name'}
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
