export type List = {
  _id: string;
  name: string;
  userId: string;
  tasks: Task[];
};

export type User = {
  _id: string;
  googleId: string;
  displayName: string;
} | null;

export type Task = {
  _id: string;
  name: string;
  status: boolean;
};
