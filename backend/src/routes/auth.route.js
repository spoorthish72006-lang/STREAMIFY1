import express from "express";
import { login, logout, signup, checkAuth } from "../controller/auth.controller";
import auth from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", auth, checkAuth);

export default router;