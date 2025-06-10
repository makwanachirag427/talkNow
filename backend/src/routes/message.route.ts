import express from "express"
import { getMessages, sendMessage, usersForSidebar } from "../controllers/message.controller";
import { protectRoute } from "../middleware/protectRoute";
const router = express.Router();

router.get("/users", protectRoute, usersForSidebar)
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;