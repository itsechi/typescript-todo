import { useEditListForm } from '@/hooks/useListForm';
import { List } from '@/types';
import { Input } from './Input';

type ListFormEditProps = {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ListFormEdit = ({
  list,
  setLists,
  setIsVisible,
}: ListFormEditProps) => {
  const { handleInputChange, handleListEdit, handleSubmit, errors, register } =
    useEditListForm(list, setLists);

  return (
    <form
      onSubmit={handleSubmit(() => {
        handleListEdit();
        setIsVisible(false);
      })}
    >
      {errors.listName && (
        <span className="text-red-600">
          The list name must contain at least one character.
        </span>
      )}
      <Input
        value={list.name}
        onChange={handleInputChange}
        placeholder={'Edit the list name'}
        register={register}
        label="listName"
      />
    </form>
  );
};
