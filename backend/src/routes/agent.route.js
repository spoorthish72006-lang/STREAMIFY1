import express from "express";
import auth from "../middleware/auth.middleware";
import { getAgents } from "../controller/agent.controller";

const router = express.Router();
router.get("/", auth, getAgents);
export default router;
