import express from 'express';
const router = express.Router();
import {
  getLists,
  newList,
  deleteList,
  editList,
} from '../controllers/listController';
import { addTask, deleteTask, editTask } from '../controllers/taskController';
import { authenticateJWT } from '../middleware/authMiddleware';

// Home
router.get('/api', authenticateJWT, getLists);
router.post('/api/lists', authenticateJWT, newList);
router.delete('/api/lists/:listId', authenticateJWT, deleteList);
router.put('/api/lists/:listId', authenticateJWT, editList);

router.put('/api/tasks', authenticateJWT, addTask);
router.delete('/api/tasks/:taskId', authenticateJWT, deleteTask);
router.put('/api/tasks/:taskId', authenticateJWT, editTask);

export default router;
