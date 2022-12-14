import passport from "passport";
import { Router } from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import checkAuthenticated from "../middleware/checkAuthenticated";
import logoutController from "../controllers/logoutController";

const router = Router();

router.post("/register", registerController.handleRegister);

router.post("/login", loginController.handleLogin);

router.get("/logout", checkAuthenticated, logoutController.handleLogout);

router.get("/test", checkAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

export default router;
