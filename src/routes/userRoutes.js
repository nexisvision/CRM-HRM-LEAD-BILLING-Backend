import express from 'express';
import { getCreatedUsers } from '../controllers/userControllers/index.js';


const router = express.Router();

// Route to get users created by a specific user
router.get('/', getCreatedUsers.validator, getCreatedUsers.handler);

export default router; 