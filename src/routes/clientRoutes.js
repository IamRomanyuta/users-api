import express from 'express';
import { updateClients } from '../controllers/clientController.js';

const router = express.Router();

router.get('/update-clients', updateClients);

export default router;
