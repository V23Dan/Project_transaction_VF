import { getUsersRols } from "../controllers/rol.controller.js";
import { getRol } from "../controllers/rol.controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/token.middleware.js";

const router = Router();

router.get("/getUsersRols", getUsersRols);
router.get("/getRol",verifyToken, getRol);

export default router;
