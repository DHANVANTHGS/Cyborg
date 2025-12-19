import express from "express";
import { generateAIResponse } from "../controller/ai.js";

const router = express.Router();    
router.post("/generate", generateAIResponse);

export default router;