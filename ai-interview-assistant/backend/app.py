from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import shutil

from pdf_utils import extract_pdf_text
from fastapi.middleware.cors import CORSMiddleware

from rag_utils import (
    create_chunks,
    store_chunks,
    retrieve_context
)

from gemini_utils import (
    generate_answer,
    get_model
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = get_model()

resume_text = ""
jd_text = ""


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "AI Interview Assistant API Running"
    }


# RAG PDF Upload
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_pdf_text(file_path)

    chunks = create_chunks(text)

    store_chunks(chunks)

    return {
        "message": "PDF Uploaded Successfully",
        "chunks_created": len(chunks)
    }


# RAG Question Answering
@app.post("/ask")
async def ask_question(data: QuestionRequest):

    try:

        context = retrieve_context(
            data.question
        )

        answer = generate_answer(
            context,
            data.question
        )

        return {
            "answer": answer
        }

    except Exception as e:

        return {
            "error": str(e)
        }


# Resume Upload
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global resume_text

    file_path = f"uploads/resume_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_pdf_text(file_path)

    return {
        "message": "Resume uploaded successfully"
    }


# Job Description Upload
@app.post("/upload-jd")
async def upload_jd(file: UploadFile = File(...)):

    global jd_text

    file_path = f"uploads/jd_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    jd_text = extract_pdf_text(file_path)

    return {
        "message": "JD uploaded successfully"
    }


# Resume vs JD Analysis
@app.post("/analyze")
async def analyze():

    global resume_text
    global jd_text

    if not resume_text:
        return {
            "error": "Please upload resume first"
        }

    if not jd_text:
        return {
            "error": "Please upload job description first"
        }

    prompt = f"""
You are an expert technical recruiter.

Compare the following Resume and Job Description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Provide:

1. Matching Skills
2. Missing Skills
3. Candidate Strengths
4. Areas for Improvement
5. ATS Improvement Suggestions

Format clearly using headings and bullet points.
"""

    try:

        response = model.generate_content(prompt)

        return {
            "analysis": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }


# Interview Question Generator
@app.post("/generate-questions")
async def generate_questions():

    global resume_text
    global jd_text

    if not resume_text:
        return {
            "error": "Please upload resume first"
        }

    if not jd_text:
        return {
            "error": "Please upload job description first"
        }

    prompt = f"""
Act as a Senior Technical Interviewer.

Based on this Resume:

{resume_text}

And this Job Description:

{jd_text}

Generate:

5 Easy Questions

5 Medium Questions

5 Hard Questions

Questions should be relevant to the role.

Format nicely using headings.
"""

    try:

        response = model.generate_content(prompt)

        return {
            "questions": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }