import { Router } from "express";
import addPersonController from "../controllers/family-tree/addPersonController";
import copyPeopleController from "../controllers/family-tree/copyPeopleController";
import familyTreeController from "../controllers/family-tree/familyTreeController";
import findAncestorsController from "../controllers/family-tree/findAncestorsController";
import checkAuthenticated from "../middleware/checkAuthenticated";

const router = Router();

router.get(
  "/find-ancestor",
  checkAuthenticated,
  findAncestorsController.handleFindAncestors
);

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
