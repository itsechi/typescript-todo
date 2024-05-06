import List from '../models/List';
import { Request, Response } from 'express';

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    console.error(err);
  }
};

export const newList = async (req: Request, res: Response) => {
  try {
    const newList = new List({ listTitle: req.body.listTitle });
    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(err);
  }
};
