import { Router } from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";

const router = Router();

router.post("/register", registerController.handleRegister);

router.post("/login", loginController.handleLogin);

export default router;
