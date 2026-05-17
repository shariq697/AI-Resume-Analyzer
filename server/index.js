import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug logs (IMPORTANT for Render)
console.log("🚀 Server starting...");
console.log("PORT:", process.env.PORT);
console.log("GROQ KEY EXISTS:", !!process.env.GROQ_API_KEY);

// Check API key
if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is missing in environment variables");
}

// Create Groq client (safe)
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Health check route (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("AI Resume Analyzer API is running");
});

// Main endpoint
app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "No resume provided" });
    }

    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `
Return ONLY valid JSON in this format:
{
  "score": number,
  "summary": "short review",
  "strengths": [],
  "improvements": []
}
          `,
        },
        {
          role: "user",
          content: resume,
        },
      ],
    });

    const text = response.choices[0].message.content || "";

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    res.json(parsed);

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

// PORT FIX FOR RENDER (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});