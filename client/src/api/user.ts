import { apiRequest } from './api';

export const logInUser = async (storedToken) => {
  const errorMsg = `Failed to log in the user`;
  const options = { headers: { Authorization: `Bearer ${storedToken}` } };
  return await apiRequest(
    `${import.meta.env.VITE_API_URL}api/user`,
    errorMsg,
    options,
  );
};
