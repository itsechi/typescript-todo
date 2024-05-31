import { v4 as uuidv4 } from 'uuid';
import { createListInDB, editListInDB } from '@/api/lists';
import { Inputs, List, User } from '@/types';
import { useClickOutside } from './useClickOutside';
import { updateList } from '@/helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const initialListState = (): List => ({
  _id: '',
  name: '',
  userId: '',
  tasks: [],
});

export const useAddListForm = (
  user: User,
  setLists: React.Dispatch<React.SetStateAction<List[]>>,
) => {
  const [showListInput, setShowListInput] = useState(false);
  const [list, setList] = useState<List>(initialListState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
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
    setList(initialListState);
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
  }, list.name);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const id = list._id;
    setLists((prevLists: List[]) => updateList(prevLists, newName, id));
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
