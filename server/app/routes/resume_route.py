from fastapi import APIRouter, UploadFile, File
from app.controllers.resume_controller import parse_resume

router=APIRouter(
    prefix="/api1",
    tags=["Resume Parsing and recommendation"]
)

@router.post("/parse_resume")
async def parse_resume_route(file: UploadFile = File(...)):
    return await parse_resume(file)