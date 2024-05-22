import express from 'express';
const router = express.Router();
import { getLists, newList, deleteList } from '../controllers/listController';
import { addTask, deleteTask } from '../controllers/taskController';

// Home
router.get('/', getLists);
router.post('/lists', newList);
router.delete('/lists/:listId', deleteList);

router.put('/tasks', addTask);
router.delete('/tasks/:taskId', deleteTask);

export default router;
