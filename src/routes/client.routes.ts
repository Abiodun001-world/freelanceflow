import { Router } from 'express';

import {
  getAllClients,
  getClientById,
  createClient,
  updateClientById,
  deleteClientById,
} from '../controllers/client.controller';

const router = Router();

router.get('/all', getAllClients);
router.get('/:id', getClientById);
router.post('/create', createClient);
router.put('/update/:id', updateClientById);
router.delete('/:id', deleteClientById);

export default router;
