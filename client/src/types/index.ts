export type List = {
  _id?: string;
  listTitle: string;
  userId: string;
  tasks: Task[];
};

export type User = {
  _id: string;
  googleId: string;
  displayName: string;
} | null;

export type Task = {
  name: string;
  status: boolean;
};
