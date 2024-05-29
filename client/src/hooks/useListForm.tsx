import { v4 as uuidv4 } from 'uuid';
import { createListInDB, editListInDB } from '@/api/lists';
import { List, User } from '@/types';
import { useClickOutside } from './useClickOutside';
import { updateList } from '@/helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

type Inputs = {
  listName: string;
  taskName: string;
};

export const useAddListForm = (
  user: User,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) => {
  const [showListInput, setShowListInput] = useState(false);
  const [list, setList] = useState<List>({
    _id: '',
    name: '',
    userId: '',
    tasks: [],
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

  const handleListSubmit: SubmitHandler<Inputs> = async () => {
    const newList = {
      ...list,
      _id: user ? '' : uuidv4(),
      userId: user ? user._id : '',
    };
    try {
      if (user) {
        // User logged in
        const response = await createListInDB(newList);
        setLists((prevLists) => [...prevLists, response]);
      } else {
        // Local storage
        setLists((prevLists) => [...prevLists, newList]);
      }
      resetListForm();
    } catch (error) {
      console.error('Failed to create list:', error);
    }
  };

  const resetListForm = () => {
    if (!setList) return;
    setList({
      _id: '',
      name: '',
      userId: '',
      tasks: [],
    });
    setShowListInput(false);
    reset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList((prevList) => ({
      ...prevList,
      name: e.target.value,
    }));
  };

  return {
    list,
    showListInput,
    setShowListInput,
    handleInputChange,
    handleSubmit,
    handleListSubmit,
    resetListForm,
    errors,
    register,
  };
};

export const useEditListForm = (
  list: List,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) => {
  // List edit input context, this makes it save the user changes on outside clicks
  const { ref, isVisible, setIsVisible } = useClickOutside(() => {
    editListInDB(list.name, list._id);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const id = list._id;
    setLists((prevLists: List[]) => {
      const editedList = updateList(prevLists, newName, id);
      return editedList;
    });
  };

  const handleListEdit = () => {
    editListInDB(list.name, list._id);
  };

  return {
    ref,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleListEdit,
    handleSubmit,
    errors,
    register,
  };
};
