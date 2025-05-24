import express from 'express'
import { getWork, updateWork, createWork, deleteWork } from '../controllers/work.controller'

const router = express.Router();

router.get('/', getWork);
router.post('/', createWork);
router.put('/', updateWork);
router.delete('/', deleteWork);

export default router;