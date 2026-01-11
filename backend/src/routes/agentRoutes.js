import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getAgents } from "../controllers/agentController.js";

const router = express.Router();
router.get("/", auth, getAgents);
export default router;
