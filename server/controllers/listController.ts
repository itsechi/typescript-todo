import List from "../models/list";
import { Express, Request, Response} from 'express';

export const getLists = async (req: Request, res: Response) => {
  const lists = await List.find();
  console.log(lists)
  res.json(lists)
}