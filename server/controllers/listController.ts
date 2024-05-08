import List from '../models/List';
import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

export const getLists = async (req: Request, res: Response) => {
  if (!req.user) return;
  try {
    const lists = await List.find({ userId: req.user._id });
    res.json(lists);
  } catch (err) {
    console.error(err);
  }
};

export const newList = async (req: Request, res: Response) => {
  try {
    const newList = new List({
      listTitle: req.body.listTitle,
      userId: req.body.userId,
    });
    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(err);
  }
};
