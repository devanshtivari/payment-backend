import { Router } from "express";
import { validateTransaction } from "../middleware";
import { addTransaction, getBalance } from "../components";

const router: Router = Router();

router.post('/add', validateTransaction, addTransaction);
router.get('/balance', getBalance)

export default router;