import express from 'express'
const router = express.Router();
import { getLists } from '../controllers/listController';

router.get('/', getLists);

export default router;