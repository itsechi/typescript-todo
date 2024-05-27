import { editListInDB } from '@/api/lists';
import { List, User } from '@/types';
import { useClickOutside } from './useClickOutside';
import { updateList } from '@/helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

type Inputs = {
  listName: string;
};

// Edit form
export const useListForm = (
  list: List,
  lists: List[],
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
  user: User,
) => {
  // List edit input context, this makes it save the user changes on outside clicks
  const { ref, isVisible, setIsVisible } = useClickOutside(() => {
    editListInDB(list.name, list._id);
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleListInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const id = list._id;
    setLists((prevLists) => {
      const editedList = updateList(prevLists, newName, id);
      return editedList;
    });
  };

  const handleListSubmit: SubmitHandler<Inputs> = () => {
    editListInDB(list.name, list._id);
    setIsVisible(!isVisible);
  };

  return {
    ref,
    isVisible,
    setIsVisible,
    handleListInputChange,
    handleListSubmit,
    handleSubmit,
    errors,
    register,
  };
};
