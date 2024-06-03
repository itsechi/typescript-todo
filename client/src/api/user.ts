import { apiRequest } from './api';

export const logInUser = async () => {
  const errorMsg = `Failed to log in the user`;
  const options = { credentials: 'include' } as RequestInit;
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}auth/google/callback/success`,
    errorMsg,
    options,
  );
};
