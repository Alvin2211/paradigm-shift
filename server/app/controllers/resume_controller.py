import os
from fastapi import HTTPException, UploadFile, File
from app.utils.parser import parse_resume as parse_pdf_resume
from app.services.resume_llm import run_resume_llm as run_llm


async def parse_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    temp_path = f"temp_{file.filename}"

    try:
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        parsed = parse_pdf_resume(temp_path)
        if not parsed:
            raise HTTPException(status_code=500, detail="Failed to parse resume content.")

        llm_result = run_llm(parsed)
        if isinstance(llm_result, dict) and "error" in llm_result:
            raise HTTPException(
                status_code=500,
                detail=llm_result.get("details", "LLM processing failed.")
            )

        return llm_result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)