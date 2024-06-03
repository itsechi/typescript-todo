import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, List } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useListOperations } from '@/hooks/useListOperations';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useListStore } from '@/hooks/useContext';

type ListFormProps = {
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  currentList?: List;
};

export const ListForm = ({
  setIsVisible,
  currentList: existingList,
}: ListFormProps) => {
  const [showListInput, setShowListInput] = useState(false);
  const { lists } = useListStore();

  const {
    currentList,
    handleListInputChange,
    handleListSubmit,
    handleListEdit,
    handleReset,
  } = useListOperations(existingList);

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
      <Input
        value={currentList.name}
        onChange={handleListInputChange}
        placeholder="Enter the list name"
        register={register}
        label="listName"
      />
      {errors.listName && (
        <span className="text-error text-sm">
          The list name must contain at least one character.
        </span>
      )}
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
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(() => {
        handleListEdit(currentList);
        setIsVisible!(false);
      })}
    >
      <Input
        value={currentList.name}
        onChange={handleListInputChange}
        placeholder={'Edit the list name'}
        register={register}
        label="listName"
      />
      {errors.listName && (
        <span className="text-error text-sm">
          The list name must contain at least one character.
        </span>
      )}
    </form>
  );

  return isEditing ? EditList : AddList;
};
