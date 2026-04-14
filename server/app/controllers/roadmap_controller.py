from app.services.roadmap_llm import roadmap_llm

async def get_roadmap(query:str):

    try:
        if not query:
            return {"error": "Query parameter is required."}
        result = await roadmap_llm(query)
        if isinstance(result, dict) and "error" in result:
            return {"error": result.get("details", "LLM processing failed.")}
        return result
    except Exception as e:
        print("Error generating roadmap:", str(e))
        return {"error": "Failed to generate roadmap", "details": str(e)}
 