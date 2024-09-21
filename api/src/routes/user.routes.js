import { Router } from "express";
import { getUserData } from "../controllers/user.controller.js";
import { getAccountData } from "../controllers/user.controller.js";

import { verifyToken } from "../middleware/token.middleware.js";
const router = Router();
router.get("/DataAccount", verifyToken, getAccountData);
router.get("/DataUser", verifyToken, getUserData);

export default router;
