import fitz 
import re 
import json
from nltk.corpus import stopwords

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def parse_resume(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    cleaned_text = clean_text(text)
    cleaned_text = remove_stopwords(cleaned_text)

    resume_data = cleaned_text
    


    return resume_data

def clean_text(text):
    text = text.replace("\n", " ")  
    text = re.sub(r"\s+", " ", text)  
    text = re.sub(r"[•●○▪■]", "", text) 
    text = re.sub(r"[^a-zA-Z0-9@+.,\- ]", " ", text) 
    text = text.strip()
    return text

stop_words = set(stopwords.words("english"))
def remove_stopwords(text):
    return " ".join([word for word in text.split() if word.lower() not in stop_words])


if __name__ == "__main__":
    pdf_path = "" 
    parsed_data = parse_resume(pdf_path)
    print(json.dumps(parsed_data, indent=4))
