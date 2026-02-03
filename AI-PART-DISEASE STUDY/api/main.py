from fastapi import FastAPI
from routers import disease, cancer
import uvicorn

# Initialize Main App
app = FastAPI(
    title="MedCare Modular API",
    description="Unified API for Disease Prediction (ML), Cancer Detection (DL), and Medical Chat (GenAI).",
    version="2.0"
)

# --- Register Routers ---
# 1. Disease Prediction (Machine Learning)
app.include_router(disease.router, prefix="/disease", tags=["Disease Prediction"])

# 2. Cancer Detection (Deep Learning)
app.include_router(cancer.router, prefix="/cancer", tags=["Cancer Detection (Deep Learning)"])

# 3. Medical Chatbot (GenAI)
try:
    from routers import chat
    app.include_router(chat.router, prefix="/chat", tags=["Medical Chatbot"])
except ImportError:
    print("Chat module dependencies not found. Chatbot disabled.")

@app.get("/")
def root():
    return {
        "message": "MedCare API is running.",
        "endpoints": {
            "disease": "/disease/predict",
            "cancer": "/cancer/scan"
        }
    }

if __name__ == "__main__":
    print("Starting Modular API Server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
