import axios from "axios";
import { Cyborg } from "../cyborg.js";
import { embed } from "../embed.js";

export const generateAIResponse = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    const qVector = await embed(question);

    // 2️⃣ Query CyborgDB
    const cyborg = new Cyborg();
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
    const aiRes = await axios.post(  //have to change it
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
};

export default { generateAIResponse };