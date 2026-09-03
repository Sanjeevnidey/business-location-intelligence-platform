import express from 'express';
import { getAnalysis } from '../controllers/analysisController.js';

const router = express.Router();

router.get('/', getAnalysis);

export default router;