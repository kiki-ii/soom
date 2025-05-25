import express from 'express';
import { getWork, updateWork, createWork, deleteWork } from '../controllers/work.controller.js';

const router = express.Router();

router.get('/', getWork);
router.post('/', createWork);
router.put('/:id', updateWork);
router.delete('/:id', deleteWork);

export default router;