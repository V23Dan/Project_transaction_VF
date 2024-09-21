import { Router } from "express";
import { transferFunds } from "../controllers/transfer.controller.js";
import { DepositFunds } from "../controllers/transfer.controller.js";
import { RetreatFunds } from "../controllers/transfer.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";
//import { getAccountByUser } from "../controllers/account.controller.js";
import { getTransactions } from "../controllers/transfer.controller.js";
import { getAllTransactions } from "../controllers/transfer.controller.js";

const router = Router();

router.post("/transfer", verifyToken, transferFunds); // Ruta protegida
router.post("/deposit", verifyToken, DepositFunds); // Ruta protegida
router.post("/retreat", verifyToken, RetreatFunds); // Ruta protegida
//router.get("/getAccount", verifyToken, getAccountByUser);
router.get("/getTransactions", verifyToken, getTransactions);
router.get("/getAllTransactions", verifyToken, getAllTransactions);

export default router;
