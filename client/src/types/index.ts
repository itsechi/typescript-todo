export type List = {
  listTitle: string;
  userId: string;
};

export type User = {
  _id: string;
  googleId: string;
  displayName: string;
} | null;
