from fastapi import APIRouter
from app.controllers.resume_controller import parse_resume

router=APIRouter(
    prefix="/api1",
    tags=["Resume Parsing and recommendation"]
)

router.post("/parse_resume")(parse_resume)