import os
from fastapi import UploadFile, File
from app.utils.parser import parse_resume as parse_pdf_resume
from app.services.resume_llm import run_resume_llm as run_llm



async def parse_resume(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    parsed = parse_pdf_resume(temp_path)
    llm_response = run_llm(parsed)

    os.remove(temp_path)

    return llm_response