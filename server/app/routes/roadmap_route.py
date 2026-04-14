from app.controllers.roadmap_controller import get_roadmap
from fastapi import APIRouter

router=APIRouter(
    prefix="/api1", 
    tags=["roadmap generator"]
)

@router.get("/get_roadmap")
async def rec_courses_route(query: str):
    return await get_roadmap(query)