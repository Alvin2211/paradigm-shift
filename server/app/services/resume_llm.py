from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm

def run_resume_llm(extracted_text: str):

    json_schema = """
{
  "extracted_data": {
    "name": "<applicant_name>",
    "email": "<email_address>",
    "years_of_experience": "<number_or_string_e.g._5.5_years>",
    "phone_number": "<phone_number>"
  },
  "career_recommendation": {
    "career_title": "<suggested_job_title>",
    "designation": "<suggested_designation_e.g._Tech/Management>",
    "required_skills": [
      "<skill_1>",
      "<skill_2>",
      "<skill_3>"
    ],
    "career_description": "<concise_summary_of_the_role>",
    "global_demand": "<1-2_sentence_assessment_of_demand>",
    "related_jobs": [
      "<alternative_job_1>",
      "<alternative_job_2>"
    ]
  }
}
"""

    prompt = ChatPromptTemplate.from_messages([
        ("system",
        "You are a dual-function expert: a Resume Data Extractor and a Career Recommendation Engine. "
        "Analyze the resume text and output ONLY valid JSON. No explanations, no markdown."
        ),

        ("user",
        "### INPUT RESUME TEXT:\n"
        "{extracted_text}\n\n"
        "### REQUIRED JSON SCHEMA:\n"
        "{json_schema}"
        )
    ])

    chain = prompt | llm

    # FIXED: Correct variable names
    result = chain.invoke({
        "extracted_text": extracted_text,
        "json_schema": json_schema
    })

    return result.content
