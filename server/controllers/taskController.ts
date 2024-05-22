import { Request, Response } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';
import List from '../models/List';

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

export const deleteTask = async (req: Request, res: Response) => {
  console.log('task deleting');
  try {
    const task = await Task.findById(req.body.id);
    await List.findByIdAndUpdate(task!.listId, {
      $pull: { tasks: new mongoose.Types.ObjectId(task!._id) },
    });
    await Task.findByIdAndDelete(req.body.id);
  } catch (err) {
    console.error(err);
  }
};
