import express from 'express';
import { authenticateUser, checkRole } from '../middlewares/index.js';
import { createTicket, getAllTickets, updateTicket, deleteTicket } from '../controllers/ticketController/index.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', upload.single('file'), createTicket.validator, createTicket.handler);
router.get('/', getAllTickets.validator, getAllTickets.handler);
router.put('/:id', upload.single('file'), updateTicket.validator, updateTicket.handler);
router.delete('/:id', deleteTicket.validator, deleteTicket.handler);

export default router;

