import { Router } from "express";
import { validateTransaction } from "../middleware";
import { addTransaction, getBalance, getTransactionHistory } from "../components";

const router: Router = Router();

router.post('/add', validateTransaction, addTransaction);
router.get('/balance', getBalance)
router.get('/history/?:page', getTransactionHistory)

export default router;