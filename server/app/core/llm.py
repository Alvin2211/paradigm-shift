from langchain_openai import ChatOpenAI
from app.core.config import settings

llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0,
    api_key=settings.OPENAI_API_KEY
)
