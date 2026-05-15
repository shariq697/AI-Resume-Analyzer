AI Resume Analyzer

A full-stack AI-powered Resume Analyzer that evaluates resumes using Ollama (Llama 3) and generates an ATS score along with structured feedback including strengths, improvements, and a recruiter-style summary. The project simulates real-world Applicant Tracking System (ATS) behavior used in modern recruitment.

Overview

* Users paste their resume into the application
* The system analyzes resume quality, structure, and ATS compatibility
* AI returns a structured evaluation with score and feedback
* Results are displayed in a clean dashboard interface

Features

* ATS Score generation from 0 to 100
* AI-powered resume analysis using Llama 3 (Ollama)
* Strengths detection based on skills and experience
* Improvement suggestions to optimize resume performance
* Recruiter-style AI summary feedback
* Real-time analysis through API requests
* Clean and modern UI design

How It Works

* User enters resume text in the input box
* Frontend sends request to backend API
* Backend processes resume using Ollama (Llama 3 model)
* AI generates structured response (score, strengths, improvements, summary)
* Frontend displays formatted results in dashboard layout

Tech Stack

* Frontend: React (Vite), JavaScript, CSS
* Backend: Node.js, Express.js
* AI Engine: Ollama (Llama 3)

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
"Improve formatting consistency",
"Reduce redundancy in technical skills",
"Add more role-specific keywords"
]
}

Project Structure

* ai-resume-analyzer/
* server/ → Backend (Express API)
* src/ → Frontend (React Application)
* package.json → Project configuration

Highlights

* Full-stack AI integration using modern web technologies
* Real-world ATS resume evaluation system
* Structured AI response handling
* SaaS-style user interface
* Practical HR-tech application

Future Improvements

* PDF resume upload support
* Job description matching system
* Skill gap analysis engine
* Downloadable ATS reports in PDF format
* User authentication system
