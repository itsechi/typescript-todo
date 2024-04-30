import List from '../models/list';
import { Request, Response } from 'express';

export const getLists = async (req: Request, res: Response) => {
  const lists = await List.find();
  res.json(lists);
};

export const newList = async (req: Request, res: Response) => {
  try {
    const newList = new List({ listTitle: req.body.listTitle });
    console.log(newList, req.body.listTitle);
    await newList.save();
    res.json({
      msg: 'Created a new list',
      newList,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      msg: 'Error',
      err,
    });
  }
};
