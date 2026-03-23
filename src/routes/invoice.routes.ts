import { Router } from 'express';
import {
  getAllInvoices,
  getInvoiceStats,
  getInvoiceById,
  createInvoice,
  updateInvoiceStatusById,
  deleteInvoiceById,
} from '../controllers/invoice.controller';

const router = Router();

router.get('/all', getAllInvoices);
router.get('/stats', getInvoiceStats);
router.get('/:id', getInvoiceById);
router.post('/create', createInvoice);
router.patch('/update/:id/status', updateInvoiceStatusById);
router.delete('/:id', deleteInvoiceById);

export default router;
