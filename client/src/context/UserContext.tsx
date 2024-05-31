import React, { ReactNode, createContext, useState } from 'react';
import { User } from '@/types';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    _id: '6647669b09bfff8ffacf7b9e',
    googleId: 'abcd',
    displayName: 'Test',
  }); // TESTING ONLY

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
