import { Router } from "express";
import {
  getUser,
  creandoUsers,
  adminRegisterUsers,
  login,
  isLogin,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/token.middleware.js";
import { logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/logout", logout);
router.post("/register", creandoUsers);
router.post("/adminRegisterUser", adminRegisterUsers);
router.post("/login", login);
router.get("/isAuth", isLogin)
router.get("/users/:documento");
router.get("../middleware/token.middleware.js", verifyToken, getUser);

export default router;
