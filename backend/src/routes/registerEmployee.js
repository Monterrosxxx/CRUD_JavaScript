import express from "express";
import registerEmployeeController from "../controllers/registerEmployeeController.js";

const router = express.Router();

router.post("/", registerEmployeeController.register);

export default router;