import express from 'express';
const router = express.Router();
import {
  getLists,
  newList,
  deleteList,
  editList,
} from '../controllers/listController';
import { addTask, deleteTask, editTask } from '../controllers/taskController';

// Home
router.get('/', getLists);
router.post('/lists', newList);
router.delete('/lists/:listId', deleteList);
router.put('/lists/:listId', editList);

router.put('/tasks', addTask);
router.delete('/tasks/:taskId', deleteTask);
router.put('/tasks/:taskId', editTask);

export default router;
