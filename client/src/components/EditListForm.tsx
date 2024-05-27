import { useListForm } from '@/hooks/useListForm';
import { List, User } from '@/types';
import { Input } from './Input';

type ListFormProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  lists: List[];
  user: User;
};

export const EditListForm = ({
  list,
  lists,
  setLists,
  user,
}: ListFormProps) => {
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

  return isVisible ? (
    <form
      ref={ref as React.RefObject<HTMLFormElement>}
      onSubmit={handleSubmit(handleListSubmit)}
    >
      {errors.listName && (
        <span className="text-red-600">
          The list name must contain at least one character.
        </span>
      )}
      <Input
        value={list.name}
        onChange={handleListInputChange}
        placeholder={'Edit the list name'}
        register={register}
        label="listName"
      />
    </form>
  ) : (
    <h3
      className="cursor-pointer text-sm font-semibold"
      onClick={() => setIsVisible(!isVisible)}
    >
      {list.name}
    </h3>
  );
};
