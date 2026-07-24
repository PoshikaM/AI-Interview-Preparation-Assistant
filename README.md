# 🤖 AI Interview Preparation Assistant

## 📖 Overview

**AI Interview Preparation Assistant** is a **Retrieval-Augmented Generation (RAG)** based application designed to help candidates prepare for technical interviews more effectively.

The application allows users to upload their **Resume** and **Job Description (JD)** PDFs, analyze skill alignment, identify missing skills, generate AI-powered interview questions, and receive context-aware responses using information retrieved from the uploaded documents.

---

# 🛠️ Tech Stack

## 🎨 Frontend

* React.js
* Axios

## ⚙️ Backend

* FastAPI
* Python

## 🧠 AI & RAG

* Google Gemini API
* ChromaDB (Vector Database)
* Sentence Transformers
* LangChain Text Splitters

## 📄 Document Processing

* PyPDF

---

# ✨ Key Features

* 📄 Resume and Job Description Upload
* 📊 Resume vs Job Description Analysis
* 🎯 Skill Gap Identification
* ❓ AI-Powered Interview Question Generation
* 🤖 Retrieval-Augmented Generation (RAG) Based Question Answering
* 🔍 Semantic Search Using Vector Embeddings
* 📑 PDF Text Extraction and Processing

---

# 🔄 How It Works

1. 📤 Upload Resume and Job Description PDFs.
2. 📄 Extract text from the uploaded PDF documents.
3. ✂️ Split the extracted text into smaller chunks.
4. 🧠 Convert each chunk into vector embeddings.
5. 🗄️ Store the embeddings in **ChromaDB**.
6. 🔍 Perform semantic retrieval to find the most relevant document chunks for the user's query.
7. 🤖 Provide the retrieved context to **Google Gemini**.
8. 💬 Generate accurate, context-aware AI responses.

---

# 🚀 Future Enhancements

* 🎤 Mock Interview Sessions
* 📝 AI-Based Answer Evaluation
* 🔐 Authentication and User Profiles
* 💬 Chat History Management
* 📚 Multi-Document Knowledge Base
* ☁️ Cloud Deployment

---

# 📚 Technologies & Concepts Demonstrated

* 🔹 Retrieval-Augmented Generation (RAG)
* 🔹 Large Language Model (LLM) Integration
* 🔹 Vector Databases
* 🔹 Embeddings & Semantic Search
* 🔹 Prompt Engineering
* 🔹 Full-Stack Development with React & FastAPI
