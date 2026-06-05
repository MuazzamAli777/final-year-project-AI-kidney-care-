from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# ✅ CORS (React frontend allow)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me apni domain lagana
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ❗ Better: API key ko env variable me rakhna (abhi demo ke liye yahan)
API_KEY = "AIzaSyDjess5acDyfrHGmQPW83hnbbXVA811KYo"

# ✅ Request model
class ChatRequest(BaseModel):
    message: str

# ✅ Kidney related keywords filter
keywords = [
    "kidney", "renal", "stone", "pain", "urine",
    "dialysis", "nephron", "infection", "blood", "creatinine"
]

def is_kidney_related(text: str) -> bool:
    text = text.lower()
    return any(k in text for k in keywords)
@app.post("/chat")
def chat(req: ChatRequest):

    if not is_kidney_related(req.message):
        return {
            "reply": "❌ Yeh chatbot sirf kidney related sawalat ke liye hai."
        }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                       "text" : f"""
You are a professional medical AI assistant.

STRICT OUTPUT FORMAT RULES:
- Use clear section headings ONLY
- Each section must start on a new line
- Add one blank line between sections
- No markdown (** ### --- are NOT allowed)
- Keep text simple and structured
- Do NOT write long paragraphs
- Maximum 8–12 lines total

LANGUAGE RULE:
- Respond ONLY in the same language as the user's question
- If user writes in Roman Urdu → reply in Roman Urdu only
- If user writes in English → reply in English only
- Do NOT mix languages

OUTPUT FORMAT MUST BE EXACTLY LIKE THIS:

Overview:
Kidney is a vital organ...

Key Points:
• Point 1
• Point 2
• Point 3

Summary:
Short final explanation...

Question: {req.message}
"""
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(url, json=payload, timeout=30)
        data = response.json()

        if response.status_code != 200:
            return {"reply": f"API Error: {data}"}

        reply = data["candidates"][0]["content"]["parts"][0]["text"]
        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Server Error: {str(e)}"}