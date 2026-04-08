from app.core.llm import llm
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate

def run_resume_llm(extracted_text: str) -> dict:
    """
    Extract resume data and generate 3 career recommendations using LLM.
    Returns a Python Dictionary (parsed JSON).
    """

    parser = JsonOutputParser()

    json_schema = """
    {
      "extracted_data": {
        "name": "<applicant_name>",
        "email": "<email_address>",
        "phone_number": "<phone_number>",
        "years_of_experience": "<number_or_string>",
        "education": [
          {
            "degree": "<degree_name>",
            "institution": "<university_or_college>",
            "year": "<graduation_year>"
          }
        ],
        "skills": ["<skill_1>", "<skill_2>", "<skill_3>"],
        "certifications": ["<cert_1>", "<cert_2>"],
        "languages": ["<language_1>", "<language_2>"],
        "summary": "<brief_professional_summary_extracted_from_resume>"
      },
      "career_recommend": [
        {
          "career_title": "<job_title>",
          "designation": "<Tech_or_Management_or_Creative_etc>",
          "required_skills": ["<skill_1>", "<skill_2>", "<skill_3>"],
          "skills_to_learn": ["<missing_skill_1>", "<missing_skill_2>"],
          "career_description": "<2_to_3_sentence_summary_of_this_career_path>",
          "global_demand": "<High_or_Medium_or_Low_with_short_forecast>",
          "average_salary_usd": "<salary_range_per_year>",
          "related_jobs": ["<related_job_1>", "<related_job_2>", "<related_job_3>"],
          "match_score": "<percentage_match_based_on_resume_skills>"
        },
        {
          "career_title": "<job_title>",
          "designation": "<Tech_or_Management_or_Creative_etc>",
          "required_skills": ["<skill_1>", "<skill_2>", "<skill_3>"],
          "skills_to_learn": ["<missing_skill_1>", "<missing_skill_2>"],
          "career_description": "<2_to_3_sentence_summary_of_this_career_path>",
          "global_demand": "<High_or_Medium_or_Low_with_short_forecast>",
          "average_salary_usd": "<salary_range_per_year>",
          "related_jobs": ["<related_job_1>", "<related_job_2>", "<related_job_3>"],
          "match_score": "<percentage_match_based_on_resume_skills>"
        },
        {
          "career_title": "<job_title>",
          "designation": "<Tech_or_Management_or_Creative_etc>",
          "required_skills": ["<skill_1>", "<skill_2>", "<skill_3>"],
          "skills_to_learn": ["<missing_skill_1>", "<missing_skill_2>"],
          "career_description": "<2_to_3_sentence_summary_of_this_career_path>",
          "global_demand": "<High_or_Medium_or_Low_with_short_forecast>",
          "average_salary_usd": "<salary_range_per_year>",
          "related_jobs": ["<related_job_1>", "<related_job_2>", "<related_job_3>"],
          "match_score": "<percentage_match_based_on_resume_skills>"
        }
      ],
      ats_analysis": {
        "ats_score": "<score_out_of_100>",
        "strengths": ["<strength_1>", "<strength_2>"],
        "errors": ["<error_1>", "<error_2>", "<error_3>"],
        "improvements": ["<fix_1>", "<fix_2>", "<fix_3>"]
      }
    }
    """

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "You are a Resume Parsing, ATS Analyser and Career Recommendation AI. "
            "Your task is to extract structured resume data and suggest exactly 3 career paths.\n"
            "STRICT RULES:\n"
            "- Output ONLY valid JSON. No extra text, no markdown, no code blocks.\n"
            "- Follow the JSON schema exactly as provided.\n"
            "- All 3 career recommendations must have identical key names.\n"
            "- The global_demand must specify the demand in the near future ie in the next 2-3 years.\n"
            "- match_score should be a realistic estimate based on the resume skills vs required skills.\n"
            "- skills_to_learn should list skills the candidate is currently missing for that career.\n\n"
            "CAREER DIVERSITY RULES (strictly enforced):\n"
            "- Each of the 3 careers MUST belong to a clearly different domain or specialization.\n"
            "- Do NOT recommend careers that heavily overlap in responsibilities or required skills.\n"
            "- For example, never recommend both 'Full Stack Developer' and 'Web Developer' together — they are too similar.\n"
            "- Spread recommendations across different tracks, for example: one engineering role, one data/AI role, one cloud/DevOps or management role.\n"
            "- The required_skills list for each career must be meaningfully different from the others.\n"
            "- Think of it as giving the candidate 3 genuinely different future paths, not 3 variations of the same job.\n"
            " ATS RULES:\n"
            "- Calculate an ATS score out of 100 based on formatting, keywords, clarity, and structure.\n"
            "- Identify 3 to 4 critical errors that reduce ATS score.\n"
            "- Provide actionable improvements to fix those errors.\n"
            "- Be realistic: most resumes score between 50–85 unless exceptional.\n"
            "- Penalize missing keywords, poor formatting, no metrics, vague descriptions.\n"
            "{format_instructions}"
        ),
        (
            "user",
            "RESUME TEXT:\n{extracted_text}\n\n"
            "REQUIRED JSON SCHEMA:\n{json_schema}"
        )
    ])

    chain = prompt | llm | parser

    try:
        result = chain.invoke({
            "extracted_text": extracted_text,
            "json_schema": json_schema,
            "format_instructions": parser.get_format_instructions()
        })
        return result

    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return {"error": "Failed to parse resume data", "details": str(e)}