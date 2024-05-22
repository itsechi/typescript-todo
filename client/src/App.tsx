import { useEffect, useState } from 'react';
import Dashboard from './layouts/Dashboard';
import Navbar from './layouts/Navbar';
import { logInUser } from './api/user';
import { User } from './types';

function App() {
  const [user, setUser] = useState({
    _id: '6647669b09bfff8ffacf7b9e',
    googleId: 'abcd',
    displayName: 'Test',
  }); // TESTING ONLY

  // const [user, setUser] = useState<User | null>(null);
  // useEffect(() => {
  //   const handleLogIn = async () => {
  //     const response = (await logInUser()) || null;
  //     setUser(response);
  //   };
  //   handleLogIn();
  // }, []);

  return (
    <>
      <div className="tpl-visual-object-1"></div>
      <Navbar user={user} />
      <Dashboard user={user} />
    </>
  );
}

export default App;
