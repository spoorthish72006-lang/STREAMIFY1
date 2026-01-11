import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getSettings, updateSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", auth, getSettings);
router.put("/", auth, updateSettings);

export default router;
