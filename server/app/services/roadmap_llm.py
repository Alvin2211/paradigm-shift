
from app.core.llm import llm
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate

async def roadmap_llm(query:str):

    json_schema = """
        {
        "title": "string",
        "description": "string (1-2 sentences)",
        "total_duration_days": "number",

        "main_topics": [
            {
            "id": "number (0-based index)",
            "title": "string",
            "description": "string (short, 2 line)",

            "subtopics": [
                {
                "id": "string (format: '0.1', '0.2', '0.3')",
                "title": "string",
                "description": "string (short, 3 line)"
                }
            ]
            }
        ]
        }
    """

    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            """
            You are an expert roadmap architect generating a STRICT 6-STAGE learning roadmap.

            RULES:
            - Generate EXACTLY 6 main_topics (id 0 to 5)
            - Each main_topic MUST have EXACTLY 3 subtopics
            - Subtopic IDs must follow:
            Topic 0 → 0.1, 0.2, 0.3
            Topic 1 → 1.1, 1.2, 1.3

            - Keep descriptions SHORT (1-3 lines)
            - Maintain beginner → advanced progression
            - Do NOT add extra fields
            - Do NOT skip anything

            QUALITY RULES:
            - Avoid repetition across topics
            - Ensure logical skill progression
            Return ONLY valid JSON.
            """
        ),
        (
            "user",
            "Generate a complete roadmap for:\n\nQUERY:\n{query}\n\nSchema:\n{json_schema}"
        )
    ])
         
        

    parser=JsonOutputParser()
    
    chain= prompt | llm | parser

    try:
        result = await chain.ainvoke({
            "query": query,
            "json_schema": json_schema
        })
        return result
    except Exception as e:
        print("Error generating roadmap:", str(e))
        return {"error": "Failed to parse resume data", "details": str(e)}
    