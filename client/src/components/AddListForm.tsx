import { useListForm } from '@/hooks/useListForm';

export const AddListForm = () => {
  const {
    ref,
    isVisible,
    setIsVisible,
    handleListInputChange,
    handleListSubmit,
    handleSubmit,
    errors,
    register,
  } = useListForm(list, lists, setLists, user);

  return showInput ? (
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
        register={register}
        onChange={handleInputChange}
        placeholder="Enter the list name"
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
    <Button styling="tertiary" onClick={() => setShowInput(true)}>
      <PlusIcon className="h-4 w-4" />
      {lists.length > 0 ? 'Add a new list' : 'Add your first list'}
    </Button>
  );
};
