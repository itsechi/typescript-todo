import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { createListInDB, deleteListFromDB, editListInDB } from '@/api/lists';
import { List } from '@/types';
import { updateList } from '@/helpers/listHelpers';
import { useListStore, useUserStore } from './useContext';

export const useListOperations = (existingList?: List) => {
  const [currentList, setCurrentList] = useState<List>(
    existingList || {
      _id: '',
      name: '',
      userId: '',
      tasks: [],
    },
  );
  const { user } = useUserStore();
  const { setLists } = useListStore();

  const handleListInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentList((prevList) => ({ ...prevList, name: e.target.value }));
    if (existingList) {
      setLists((prevLists) =>
        updateList(prevLists, e.target.value, currentList._id),
      );
    }
  };

  const handleListEdit = async (list: List) => {
    if (user) await editListInDB(list.name, list._id);
  };

  const handleListDelete = async (id: string) => {
    setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    if (user) await deleteListFromDB(id);
  };

  const handleListSubmit = async () => {
    const newList = {
      ...currentList,
      _id: user ? '' : uuidv4(),
      userId: user ? user._id : '',
    };
    // User logged in
    if (user) {
      const response = await createListInDB(newList);
      setLists((prevLists) => [...prevLists, response]);
    } else {
      // Local storage
      setLists((prevLists) => [...prevLists, newList]);
    }
    handleReset();
  };

  // Done
  const handleReset = () => {
    setCurrentList({ _id: '', name: '', userId: '', tasks: [] });
  };

  return {
    currentList,
    setCurrentList,
    handleListInputChange,
    handleListEdit,
    handleListDelete,
    handleListSubmit,
    handleReset,
  };
};
