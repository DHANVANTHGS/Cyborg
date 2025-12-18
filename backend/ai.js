// ai.js
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/ai/ask
router.post("/ask", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Token missing" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user_id = decoded.user_id;

    const { question } = req.body;
    if (!question)
      return res.status(400).json({ message: "Question is required" });

    // 🔁 Call friend's AI model
    const aiResponse = await axios.post(
      "http://FRIENDS_AI_URL/ask", // 🔴 replace this
      {
        question,
        user_id
      }
    );

    return res.status(200).json({
      answer: aiResponse.data.answer
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "AI service failed" });
  }
});

export default router;
