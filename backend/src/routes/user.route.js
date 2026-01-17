import express from "express";
import { getAgents } from "../controller/user.controller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/agents", auth, getAgents);

export default router;
