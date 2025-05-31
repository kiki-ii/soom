import express from 'express';

import { getService, updateService, createService, deleteService } from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', getService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;