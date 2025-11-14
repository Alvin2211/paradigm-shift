from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.utils.parser import parse_resume as parse_pdf_resume
import os
app = FastAPI(title="AI Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Python Microservice Running"}

@app.post("/api1/parse_resume")
async def parse_resume_endpoint(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    parsed = parse_pdf_resume(temp_path)

    os.remove(temp_path)

    return parsed
    