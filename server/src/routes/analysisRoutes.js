import { Router } from 'express';
import { getAnalysis } from '../controllers/analysisController.js';
const router = Router();
router.get('/', getAnalysis);
export default router;