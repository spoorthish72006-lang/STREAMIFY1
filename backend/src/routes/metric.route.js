import express from "express";
import auth from "../middleware/auth.middleware";
import { getMetrics } from "../controller/metric.controller";

const router = express.Router();
router.get("/", auth, getMetrics);
export default router;
