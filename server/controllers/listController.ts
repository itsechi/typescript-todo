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
  // if (!req.user) return;
  try {
    const id = '6647669b09bfff8ffacf7b9e';
    const lists = await List.find({ userId: id }).populate('tasks'); // TESTING ONLY
    // const lists = await List.find({ userId: req.user._id }).populate('tasks');
    res.json(lists);
  } catch (err) {
    console.error(`Error getting the lists from the DB: ${err}`);
  }
};

export const newList = async (req: Request, res: Response) => {
  try {
    const newList = new List({
      listTitle: req.body.listTitle,
      userId: req.body.userId,
      tasks: req.body.tasks,
    });
    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(`Error adding the list to the DB: ${err}`);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  console.log('list deleting');
  try {
    await List.findByIdAndDelete(req.body.id);
  } catch (err) {
    console.error(`Error deleting the list from the DB: ${err}`);
  }
};

export const editList = async (req: Request, res: Response) => {
  try {
    await List.findByIdAndUpdate(req.body.id, {
      listTitle: req.body.listTitle,
    });
  } catch (err) {
    console.error(`Error editing the list from the DB: ${err}`);
  }
};
