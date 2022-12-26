import { Router } from "express";
import addPersonController from "../controllers/family-tree/addPersonController";
import familyTreeController from "../controllers/family-tree/familyTreeController";
import checkAuthenticated from "../middleware/checkAuthenticated";

const router = Router();

router.get("/", checkAuthenticated, familyTreeController.handleGetTree);

router.post("/", checkAuthenticated, familyTreeController.handleInitializeTree);

router.post(
  "/add-descendant",
  checkAuthenticated,
  addPersonController.handleAddDescendant
);

router.post(
  "/add-spouse",
  checkAuthenticated,
  addPersonController.handleAddSpouse
);

export default router;
