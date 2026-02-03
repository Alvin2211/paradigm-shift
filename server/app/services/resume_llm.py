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
  {
    "career_recommend": [
      {
        "career_title": "<suggested_job_title>",
        "designation": "<suggested_designation_e.g._Tech/Management>",
        "required_skills": [
          "<skill_1_specialized_knowledge>",
          "<skill_2_tool_or_framework>",
          "<skill_3_core_principle>"
        ],
        "career_description": "<concise_summary_of_ the_role_and_its_relevance_to_full_stack>",
        "global_demand": "<1-2_sentence_assessment_of_demand_and_growth_in_the_next_3_years>",
        "related_jobs": [
          "<alternative_job_1_similar_focus>",
          "<alternative_job_2_senior_progression>"
        ]
      },
      // Second career recommendation object here (e.g., AI Engineer)
      // Third career recommendation object here (e.g., ML Engineer)
    ]
  },
}
"""

    prompt = ChatPromptTemplate.from_messages([
        ("system",
        "You are a dual-function expert: a Resume Data Extractor and a Career Recommendation Engine. You have to "
        "recommend an ideal designation and and career path "
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
