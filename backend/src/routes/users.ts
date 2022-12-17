import { Router } from "express";
import loginController from "../controllers/users/loginController";
import registerController from "../controllers/users/registerController";
import checkAuthenticated from "../middleware/checkAuthenticated";
import logoutController from "../controllers/users/logoutController";
import authenticateController from "../controllers/users/authenticateController";
import usersController from "../controllers/users/usersController";

const router = Router();

router.get("/", checkAuthenticated, usersController.getUsers);

router.post("/register", registerController.handleRegister);

router.post("/login", loginController.handleLogin);

router.get("/logout", checkAuthenticated, logoutController.handleLogout);

router.get(
  "/authenticate",
  checkAuthenticated,
  authenticateController.handleAuthenticateRequest
);

router.get("/test", checkAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

export default router;
