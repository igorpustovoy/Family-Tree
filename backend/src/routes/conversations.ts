import { Router } from "express";
import conversationController from "../controllers/users/conversationController";
import checkAuthenticated from "../middleware/checkAuthenticated";

const router = Router();

router.get("/", checkAuthenticated, conversationController.getConversations);

router.post("/", checkAuthenticated, conversationController.sendMessage);

export default router;
