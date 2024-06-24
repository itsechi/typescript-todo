import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, List } from '@/types';
import { Button } from '@/components/Button';
import { useListOperations } from '@/hooks/useListOperations';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useListStore } from '@/hooks/useContext';
import { InputController } from './InputController';

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
    handleCancel,
  } = useListOperations(existingList);

  const isEditing = !!existingList;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleListSubmit();
    resetForm();
  };

  const resetForm = () => {
    handleReset();
    setShowListInput(false);
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

  // This reverts the input to the original value if the user edits the list and leaves
  // the field empty but does not submit it, just refreshes the page
  useEffect(() => {
    window.addEventListener('beforeunload', handleCancel);
    return () => {
      window.removeEventListener('beforeunload', handleCancel);
    };
  }, [handleCancel]);

  const AddList = showListInput ? (
    <form
      className="dark:border-night-gray-200 dark:bg-night-gray-900 mt-4 flex flex-col gap-2 rounded-md border bg-white p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputController
        name="listName"
        control={control}
        onChange={handleListInputChange}
        placeholder={'Enter the list name'}
        value={currentList.name}
      />
      {errors.listName && (
        <span className="text-sm text-error">
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
      <InputController
        name="listName"
        control={control}
        onChange={handleListInputChange}
        placeholder={'Edit the list name'}
        value={currentList.name}
      />
      {errors.listName && (
        <span className="text-sm text-error">
          The list name must contain at least one character.
        </span>
      )}
    </form>
  );

  return isEditing ? EditList : AddList;
};
