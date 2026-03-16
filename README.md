# CareerAI

An AI-powered career guidance web application that helps users discover suitable career paths, generate professional resumes, and navigate their professional growth. The platform is currently in active development with more features rolling out soon.

---

## Overview

CareerAI combines a React frontend, a Node.js/Express backend, and a dedicated Python microservice to deliver intelligent, resume-aware career recommendations. Authentication is handled entirely through Clerk, enabling a seamless and secure user experience without managing credentials manually.

---

## Project Snippets

<img src="screenshots/landing.png" width="700"/>
<img src="screenshots/career-recommender-upload.png" width="700"/>
<img src="screenshots/career-results.png" width="700"/>
<img src="screenshots/resumeforge-personal.png" width="700"/>
<img src="screenshots/resumeforge-skills.png" width="700"/>
<img src="screenshots/resume-output.png" width="700"/>

---

## Features

### Career Recommender
Users upload their resume (PDF or DOCX) and the Python microservice parses it, analyzes the content, and uses an LLM to suggest suitable career paths along with required skills, global demand insights, and related job roles.

### ResumeForge
A multi-step resume builder that walks users through Personal Information, Experience, Education, Projects, and Skills. On completion, the Node.js backend uses Puppeteer to render and export a polished, download-ready PDF resume.

### AI Chat *(in development)*
A conversational AI assistant for career-related queries and guidance.

### Roadmap Generator *(in development)*
Personalized step-by-step learning and career roadmaps based on the user's target role.

### Course Recommender *(in development)*
Curated course suggestions aligned with identified skill gaps and career goals.

---

## Tech Stack

**Frontend** — React, Vite, React Router, Tailwind CSS, Clerk

**Backend (Node.js)** — Node.js, Express, MongoDB, Puppeteer, Clerk SDK

**Backend (Python Microservice)** — FastAPI, LangChain, LangGraph, Groq LLM, PyMuPDF, Uvicorn

---

## Architecture

```
career-ai/
├── frontend/              # React + Vite application
├── backend/               # Node.js + Express API server
│   └── src/
│       └── server.js
└── server/                # FastAPI microservice for AI processing
    └── requirements.txt
```

The frontend communicates with the Node.js backend for authentication and resume generation. Career recommendation requests are routed from the Node.js service to the Python microservice, which handles resume parsing and LLM inference via LangChain and Groq.

---

## Status

The Career Recommender and ResumeForge features are fully functional. The AI Chat, Roadmap Generator, and Course Recommender are currently under development and will be available in an upcoming release.

---

## License

ISC
