import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { cyborg } from "./cyborg.js";
import { embed } from "./embed.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { user_id } = jwt.verify(token, "SECRET_KEY");

    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 1️⃣ Embed question
    const qVector = await embed(question);

    // 2️⃣ Query CyborgDB
    const result = await cyborg.query({
      collection: "medical_records",
      vector: qVector,
      topK: 5,
      filter: { user_id }
    });

    // 3️⃣ Build context
    const context = result.matches
      .map(r => r.metadata.text)
      .join("\n");

    // 4️⃣ Ask AI
    const aiRes = await axios.post(
      "http://FRIENDS_AI_URL/ask",
      {
        question,
        context
      }
    );

    res.json({ answer: aiRes.data.answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI error" });
  }
});

export default router;
