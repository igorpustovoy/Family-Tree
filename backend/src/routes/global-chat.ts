import { Router } from "express";
import globalChatController from "../controllers/users/globalChatController";
import checkAuthenticated from "../middleware/checkAuthenticated";

const router = Router();

router.get("/", checkAuthenticated, globalChatController.getChat);

router.post("/", checkAuthenticated, globalChatController.addMessage);

export default router;
