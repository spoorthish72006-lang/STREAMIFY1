import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getMetrics } from "../controller/metricsController.js";

const router = express.Router();
router.get("/", auth, getMetrics);
export default router;
