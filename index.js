import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "No resume provided" });
    }

    const prompt = `
You are an expert ATS resume analyzer.

Return ONLY valid JSON in this format:

{
  "score": number (0-100),
  "summary": "short overall evaluation",
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ]
}

Rules:
- Be strict and realistic
- Focus on ATS compatibility
- Keep points short and clear

Resume:
${resume}
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    const text = data.response;

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    const parsed = JSON.parse(text.slice(start, end + 1));

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI analysis failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});