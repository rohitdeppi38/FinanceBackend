import express from 'express'
import { getSummary } from '../controllers/dashboardController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/summary',verifyToken,getSummary);

export default router;