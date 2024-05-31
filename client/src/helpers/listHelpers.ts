import { List } from '@/types';

export const updateList = (lists: List[], name: string, listId: string) => {
  return lists.map((list) => (list._id === listId ? { ...list, name } : list));
};
