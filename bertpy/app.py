from fastapi import FastAPI, WebSocket
from transformers import BertTokenizer, BertForSequenceClassification
import aiohttp
import torch
import json

app = FastAPI()

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('./ai-server/models/bert_model')
model = BertForSequenceClassification.from_pretrained('./ai-server/models/bert_model')

# Intent to API mapping
INTENT_MAP = {
    "product_search": "/api/products",
    "order_status": "/api/orders",
    "cart_management": "/api/cart"
}

async def call_nodejs_api(intent, text):
    async with aiohttp.ClientSession() as session:
        url = f"http://nodejs-server{INTENT_MAP[intent]}"
        async with session.post(url, json={"query": text}) as resp:
            return await resp.json()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # BERT Inference
            inputs = tokenizer(payload['text'], return_tensors="pt", truncation=True, padding=True)
            with torch.no_grad():
                outputs = model(**inputs)
            
            predicted_intent = model.config.id2label[torch.argmax(outputs.logits).item()]
            
            # Get data from Node.js
            api_response = await call_nodejs_api(predicted_intent, payload['text'])
            
            await websocket.send_text(json.dumps({
                "intent": predicted_intent,
                "response": api_response
            }))
    except Exception as e:
        print(f"WebSocket Error: {e}")