import express from 'express'
import { createTransaction ,updateTransaction,deleteTransaction,getTransaction } from '../controllers/transactionController'
import { verifyToken } from '../middlewares/authMiddleware'
import { allowRoles } from '../middlewares/roleMiddleware'


const router = express.Router();

router.post("/", verifyToken, allowRoles("admin"), createTransaction);
router.get("/", verifyToken, allowRoles("admin", "analyst", "viewer"), getTransaction);
router.put("/:id", verifyToken, allowRoles("admin"), updateTransaction);
router.delete("/:id", verifyToken, allowRoles("admin"), deleteTransaction);

export default router;