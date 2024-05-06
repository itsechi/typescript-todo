import { User } from '@/types';

export const logInUser = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}auth/google/callback/success`,
      {
        credentials: 'include',
      },
    );
    const data = await res.json();
    return data as User;
  } catch (err) {
    console.error(err);
  }
};
