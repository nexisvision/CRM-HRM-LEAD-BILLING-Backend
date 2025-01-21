import express from 'express';
import { checkRole, fileUpload, authenticateUser } from '../middlewares/index.js';

const router = express.Router();

router.use(authenticateUser, checkRole);

router.post('/', fileUpload.array('files', 10),);

export default router; 