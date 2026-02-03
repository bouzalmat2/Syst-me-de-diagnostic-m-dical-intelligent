from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

# Input Schema
class ChatRequest(BaseModel):
    message: str
    context: str = "" # e.g. "Patient Diagnosis: Influenza"
    history: list = [] 

@router.post("/message")
async def chat_message(request: ChatRequest, x_api_key: str = Header(None)):
    """
    Medical Chatbot using Google Gemini.
    Requires 'x-api-key' header.
    Optional: 'context' field for diagnosis info.
    """
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing x-api-key header")

    try:
        # 1. Configure Gemini
        genai.configure(api_key=x_api_key)
        
        # 2. Set up the Model
        model = genai.GenerativeModel('gemini-pro')
        
        # 3. Construct Prompt with Context
        system_context = (
            "You are MedCare AI, a helpful medical assistant. "
            "Analyze the user's symptoms or questions and provide general medical advice. "
            "IMPORTANT: Always advise the user to consult a real doctor for serious issues. "
            f"Context Info: {request.context}\n"
            "Do not make definitive diagnoses. If context is provided, assume it is a potential condition to discuss.\n\n"
        )
        
        full_prompt = system_context + f"User: {request.message}\nMedCare AI:"
        
        # 4. Generate Response
        response = model.generate_content(full_prompt)
        
        return {
            "reply": response.text,
            "status": "success",
            "provider": "Google Gemini"
        }

    except Exception as e:
        # Handle invalid keys or API errors
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")
