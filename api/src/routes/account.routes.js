import { Router } from "express";

import { getAllAccounts } from "../controllers/account.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

// Ruta para obtener la cuenta del usuario autenticado
router.get("/getAllAccounts", verifyToken, getAllAccounts);

export default router;
