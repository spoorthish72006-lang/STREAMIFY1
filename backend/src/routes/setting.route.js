import express from "express";
import auth from "../middleware/auth.middleware";
import { getSettings, updateSettings } from "../controller/settings.controller";

const router = express.Router();

router.get("/", auth, getSettings);
router.put("/", auth, updateSettings);

export default router;
