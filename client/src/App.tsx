import { useEffect, useState } from 'react';
import Dashboard from './layouts/Dashboard';
import Navbar from './layouts/Navbar';
import { logInUser } from './api/user';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleLogIn = async () => {
      const response = (await logInUser()) || null;
      setUser(response);
    };
    handleLogIn();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Dashboard user={user} />
    </>
  );
}

export default App;
