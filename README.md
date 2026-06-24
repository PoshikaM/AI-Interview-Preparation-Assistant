# AI Interview Preparation Assistant

## Overview

AI Interview Preparation Assistant is a RAG-based application designed to help candidates prepare for interviews more effectively. The system allows users to upload resumes and job descriptions, analyze skill alignment, generate interview questions, and obtain AI-powered responses using contextual information retrieved from uploaded documents.

---

## Tech Stack

### Frontend

* React.js
* Axios

### Backend

* FastAPI
* Python

### AI & RAG

* Google Gemini API
* ChromaDB (Vector Database)
* Sentence Transformers
* LangChain Text Splitters

### Document Processing

* PyPDF

---

## Key Features

* Resume and Job Description Upload
* Resume vs Job Description Analysis
* Skill Gap Identification
* AI-Powered Interview Question Generation
* Retrieval-Augmented Generation (RAG) based Question Answering
* Semantic Search using Vector Embeddings
* PDF Text Extraction and Processing

---

## How It Works

1. Resume and Job Description PDFs are uploaded and processed.
2. The extracted text is divided into smaller chunks.
3. Chunks are converted into vector embeddings and stored in ChromaDB.
4. User queries are matched against relevant document content using semantic retrieval.
5. Retrieved context is provided to Gemini to generate accurate and context-aware responses.

---

## Future Enhancements

* Mock Interview Sessions
* AI-Based Answer Evaluation
* Authentication and User Profiles
* Chat History Management
* Multi-Document Knowledge Base
* Cloud Deployment

---

## Technologies & Concepts Demonstrated

* Retrieval-Augmented Generation (RAG)
* Large Language Model (LLM) Integration
* Vector Databases
* Embeddings & Semantic Search
* Prompt Engineering
* Full-Stack Development with React & FastAPI
