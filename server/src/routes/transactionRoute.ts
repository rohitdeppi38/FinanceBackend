import express from 'express'
import { createTransaction ,updateTransaction,deleteTransaction,getTransaction } from '../controllers/transactionController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { allowRoles } from '../middlewares/roleMiddleware.js'


const router = express.Router();

router.post("/", verifyToken, allowRoles("admin"), createTransaction);
router.get("/", verifyToken, allowRoles("admin", "analyst", "viewer"), getTransaction);
router.put("/:id", verifyToken, allowRoles("admin"), updateTransaction);
router.delete("/:id", verifyToken, allowRoles("admin"), deleteTransaction);

export default router;