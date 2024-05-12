import List from '../models/List';
import { Request, Response } from 'express';
import Task from '../models/Task';

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
    const lists = await List.find({ userId: req.user._id }).populate('tasks');
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
      tasks: req.body.tasks,
    });
    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(err);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    await List.findByIdAndDelete(req.body.id);
  } catch (err) {
    console.error(err);
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      listId: req.body.id,
    });
    await List.findByIdAndUpdate(req.body.id, {
      $push: { tasks: newTask },
    }).populate('tasks');
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error(err);
  }
};
