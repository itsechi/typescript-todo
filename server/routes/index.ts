import express from 'express';
const router = express.Router();
import { getLists, newList, deleteList } from '../controllers/listController';

// Home
router.get('/', getLists);
router.post('/', newList);
router.delete('/', deleteList);

export default router;
