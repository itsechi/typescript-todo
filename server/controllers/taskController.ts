import { Request, Response } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';
import List from '../models/List';

export const addTask = async (req: Request, res: Response) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      listId: req.body.id,
      status: req.body.status,
    });
    await newTask.save();

    await List.findByIdAndUpdate(
      req.body.id,
      {
        $push: { tasks: newTask },
      },
      { new: true },
    ).populate('tasks');

    res.status(201).json(newTask);
  } catch (err) {
    console.error(`Error adding the tasks to the DB: ${err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.body.id);
    await List.findByIdAndUpdate(task!.listId, {
      $pull: { tasks: new mongoose.Types.ObjectId(task!._id) },
    });
    await Task.findByIdAndDelete(req.body.id);
    res.status(204).end();
  } catch (err) {
    console.error(`Error deleting the task from the DB: ${err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editTask = async (req: Request, res: Response) => {
  const { taskId, name, status }: { [key: string]: string | boolean } =
    req.body;

  const updateFields = {
    name: name || undefined,
    status: status || undefined,
  };

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(`Error editing the task in the DB: ${err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
