import { Router } from "express";
import { signup, login, logout, checkAuth, updateProfile } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";
const router = Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/check", protectRoute, checkAuth);
router.post("/update-profile",protectRoute, updateProfile);

export default router;