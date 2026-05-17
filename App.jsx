import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data);

    } catch (error) {
      console.error(error);
      setResult({
        error: "Error analyzing resume"
      });
    }

    setLoading(false);
  };

  return (
    <div className="app-bg">

      <div className="glass">
        <h1>AI Resume Analyzer</h1>
        <p>ATS Score Checker</p>

        <textarea
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {loading && <p className="loading">Analyzing resume...</p>}

      {result && !result.error && (
        <div className="results">

          {/* SCORE */}
          <div className="score-card">
            <h2>{result.score}</h2>
            <p>ATS Score</p>
          </div>

          {/* SUMMARY */}
          <div className="card">
            <h3>Summary</h3>
            <p>{result.summary}</p>
          </div>

          {/* STRENGTHS */}
          <div className="card">
            <h3>Strengths</h3>
            <ul>
              {result.strengths?.map((item, i) => (
                <li key={i} className="good">{item}</li>
              ))}
            </ul>
          </div>

          {/* IMPROVEMENTS */}
          <div className="card">
            <h3>Improvements</h3>
            <ul>
              {result.improvements?.map((item, i) => (
                <li key={i} className="bad">{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {result?.error && (
        <p style={{ color: "red" }}>{result.error}</p>
      )}

    </div>
  );
}

export default App;