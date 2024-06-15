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
router.get('/api', getLists);
router.post('/api/lists', newList);
router.delete('/api/lists/:listId', deleteList);
router.put('/api/lists/:listId', editList);

router.put('/api/tasks', addTask);
router.delete('/api/tasks/:taskId', deleteTask);
router.put('/api/tasks/:taskId', editTask);

export default router;
