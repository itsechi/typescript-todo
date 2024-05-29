import { useEditTaskForm } from '@/hooks/useTaskForm';
import { Input } from './Input';
import { List, Task } from '@/types';

type EditTaskFormProps = {
  task: Task;
  listId: string;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditTaskForm = ({
  task,
  listId,
  setLists,
  setIsVisible,
}: EditTaskFormProps) => {
  const { handleInputChange, handleTaskEdit, handleSubmit, register, errors } =
    useEditTaskForm(task, listId, setLists);

  return (
    <form
      onSubmit={handleSubmit(() => {
        handleTaskEdit();
        setIsVisible(false);
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
        onChange={handleInputChange}
        placeholder={'Edit the task name'}
        register={register}
      />
    </form>
  );
};
