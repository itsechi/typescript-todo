import { useAddListForm } from '@/hooks/useListForm';
import { Button } from './Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Input } from './Input';
import { List, User } from '@/types';

type ListFormAddProps = {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  user: User;
};

export const ListFormAdd = ({ lists, setLists, user }: ListFormAddProps) => {
  const {
    list,
    showListInput,
    setShowListInput,
    handleInputChange,
    handleSubmit,
    handleListSubmit,
    resetListForm,
    errors,
    register,
  } = useAddListForm(user, setLists);

  return showListInput ? (
    <form
      className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
      onSubmit={handleSubmit(handleListSubmit)}
    >
      {errors.listName && (
        <span className="text-red-600">
          The list name must contain at least one character.
        </span>
      )}
      <Input
        value={list.name}
        onChange={handleInputChange}
        placeholder="Enter the list name"
        register={register}
        label="listName"
      />
      <div className="flex gap-2 text-sm">
        <Button type="submit" styling="primary">
          Add List
        </Button>
        <Button type="button" onClick={resetListForm} styling="secondary">
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <Button styling="tertiary" onClick={() => setShowListInput(true)}>
      <PlusIcon className="h-4 w-4" />
      {lists.length > 0 ? 'Add a new list' : 'Add your first list'}
    </Button>
  );
};
