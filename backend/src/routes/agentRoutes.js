import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getAgents } from "../controller/agentController.js";

const router = express.Router();
router.get("/", auth, getAgents);
export default router;
