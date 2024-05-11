export type List = {
  _id?: string;
  listTitle: string;
  userId: string;
};

export type User = {
  _id: string;
  googleId: string;
  displayName: string;
} | null;
