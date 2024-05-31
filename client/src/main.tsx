import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'non.geist';
import { UserProvider } from './context/UserContext.tsx';
import { ListProvider } from './context/ListContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </UserProvider>
  </React.StrictMode>,
);
