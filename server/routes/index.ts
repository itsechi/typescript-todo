import express from 'express';
const router = express.Router();
import { getLists, newList } from '../controllers/listController';

// Home
router.get('/', getLists);
router.post('/', newList);

export default router;
