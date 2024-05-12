import express from 'express';
const router = express.Router();
import {
  getLists,
  newList,
  deleteList,
  addTask,
} from '../controllers/listController';

// Home
router.get('/', getLists);
router.post('/', newList);
router.delete('/', deleteList);
router.put('/', addTask);

export default router;
