import { Router } from "express";
import addPersonController from "../controllers/family-tree/addPersonController";
import copyPeopleController from "../controllers/family-tree/copyPeopleController";
import familyTreeController from "../controllers/family-tree/familyTreeController";
import checkAuthenticated from "../middleware/checkAuthenticated";

const router = Router();

router.get("/:user", checkAuthenticated, familyTreeController.handleGetTree);

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

router.post(
  "/copy-branch",
  checkAuthenticated,
  copyPeopleController.handleCopyBranch
);

export default router;
