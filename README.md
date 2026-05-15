AI Resume Analyzer

A full-stack AI-powered Resume Analyzer that evaluates resumes using Ollama (Llama 3) and generates an ATS score along with structured feedback including strengths, improvements, and a recruiter-style summary. This project simulates how modern Applicant Tracking Systems are used in real hiring environments.

Overview

This application allows users to paste their resume and receive an instant AI-driven evaluation. The system analyzes the resume for structure, skills, experience quality, and ATS compatibility, then returns a scored assessment with detailed feedback.

Features

* ATS Score generation from 0 to 100
* AI-powered resume analysis using Llama 3 (Ollama)
* Strengths identification based on content quality
* Improvement suggestions to optimize resume impact
* Recruiter-style summary feedback
* Clean and modern user interface
* Real-time analysis through API communication

How It Works

1. User submits resume text through the interface
2. Frontend sends the data to the backend API
3. Backend processes the resume using Ollama (Llama 3)
4. AI returns a structured evaluation response
5. Frontend displays ATS score and feedback in a formatted layout

Tech Stack

Frontend: React (Vite), JavaScript, CSS
Backend: Node.js, Express.js
AI Engine: Ollama (Llama 3)

Example Output

{
"score": 87,
"summary": "Strong candidate with solid technical and project experience.",
"strengths": [
"Strong programming skills in Python and JavaScript",
"Good exposure to cloud and DevOps tools",
"Strong project portfolio with machine learning and networking experience"
],
"improvements": [
"Improve formatting consistency across sections",
"Reduce redundancy in technical skills listing",
"Add more role-specific keywords for ATS optimization"
]
}

Project Structure

ai-resume-analyzer/
server/        Backend API using Express.js
src/           Frontend React application
package.json   Project configuration

Highlights

Full-stack AI integration using modern web technologies
Real-world ATS resume evaluation logic
Structured AI response handling for consistent output
Professional UI designed for SaaS-style experience
Practical application relevant to HR and recruitment systems

Future Improvements

PDF resume upload support
Job description matching and skill gap analysis
Downloadable ATS reports in PDF format
User authentication and saved reports
Multi-model AI support for better accuracy
