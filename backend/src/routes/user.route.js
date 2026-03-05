import express from "express";
import { getAgents } from "../controller/user.controller";
import auth from "../middleware/auth.middleware";

const router = express.Router();

router.get("/agents", auth, getAgents);

export default router;
