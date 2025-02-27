import express from 'express';
import { EmailController } from '../controllers/EmailController/index.js';
import { authenticateUser } from '../middlewares/index.js';
const router = express.Router();

router.use(authenticateUser);

router.post('/', EmailController.sendEmail);
router.get('/', EmailController.getEmails);

export default router;
