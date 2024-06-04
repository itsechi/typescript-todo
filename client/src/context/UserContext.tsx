import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { logInUser } from '@/api/user';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<User>({
  //   _id: '6647669b09bfff8ffacf7b9e',
  //   googleId: 'abcd',
  //   displayName: 'Test',
  // }); // TESTING ONLY

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const handleLogIn = async () => {
      const response = (await logInUser()) || null;
      setUser(response);
    };
    handleLogIn();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
