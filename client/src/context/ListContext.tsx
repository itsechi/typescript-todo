// context/ListContext.tsx
import React, { ReactNode, createContext } from 'react';
import { List } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ListContextType {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

export const ListContext = createContext<ListContextType | undefined>(
  undefined,
);

export const ListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [lists, setLists] = useState<List[]>([]);
  const [lists, setLists] = useLocalStorage<List[]>('LISTS', []);

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      {children}
    </ListContext.Provider>
  );
};
