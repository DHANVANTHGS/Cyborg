import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";

const router = express.Router();    
router.post("/signup", signup);
router.post("/login", login);

export default router;