import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `
Return ONLY valid JSON:
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

    const text = response.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));