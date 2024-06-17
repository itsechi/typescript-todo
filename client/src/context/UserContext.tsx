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
    // Get token from URL if present
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // window.location.href = 'http://localhost:5173/typescript-todo/'; // Clean the URL
      window.location.href = 'https://itsechi.github.io/typescript-todo/'; // Clean the URL
    }

    // Fetch user data with token
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const handleLogIn = async () => {
        const response = await logInUser(storedToken);
        setUser(response);
      };
      handleLogIn();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
