import express from "express";
import branchController from "../controllers/branchesController.js";

const router = express.Router();

router.route("/")
.get(branchController.getBranches)
.post(branchController.createBranches)

router.route("/:id")
.delete(branchController.deleteBranches)
.put(branchController.updateBranches)

export default router;