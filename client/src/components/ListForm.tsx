import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, List, User } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useListOperations } from '@/hooks/useListOperations';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type ListFormProps = {
  user: User;
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  list?: List;
};

export const ListForm = ({
  user,
  lists,
  setLists,
  list: existingList,
  setIsVisible,
}: ListFormProps) => {
  const [showListInput, setShowListInput] = useState(false);
  const {
    currentList,
    handleListInputChange,
    handleListSubmit,
    handleListEdit,
    handleReset,
  } = useListOperations(user, setLists, existingList);

  const isEditing = !!existingList;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: isEditing ? 'onBlur' : 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleListSubmit();
    resetForm();
  };

  const resetForm = () => {
    handleReset();
    setShowListInput(false);
    reset();
  };

  const AddList = showListInput ? (
    <form
      className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.listName && (
        <span className="text-red-600">
          The list name must contain at least one character.
        </span>
      )}
      <Input
        value={currentList.name}
        onChange={handleListInputChange}
        placeholder="Enter the list name"
        register={register}
        label="listName"
      />
      <div className="flex gap-2 text-sm">
        <Button type="submit" styling="primary">
          Add List
        </Button>
        <Button type="button" onClick={resetForm} styling="secondary">
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

  const EditList = (
    <form
      onSubmit={handleSubmit(() => {
        handleListEdit(currentList);
        setIsVisible!(false);
      })}
    >
      {errors.listName && (
        <span className="text-red-600">
          The list name must contain at least one character.
        </span>
      )}
      <Input
        value={currentList.name}
        onChange={handleListInputChange}
        placeholder={'Edit the list name'}
        register={register}
        label="listName"
      />
    </form>
  );

  return isEditing ? EditList : AddList;
};
