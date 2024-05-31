import { ListContext } from '@/context/ListContext';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

export const useUserStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const useListStore = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useListStore must be used within a ListProvider');
  }
  return context;
};
