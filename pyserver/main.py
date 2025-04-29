# from fastapi import FastAPI, Request, HTTPException
# from pydantic import BaseModel
# from entity_recognition.intent_recognition import process_text

# # Initialize FastAPI app
# app = FastAPI()

# # Pydantic model to validate input
# class UserInput(BaseModel):
#     text: str

# @app.post("/process-text")
# async def process_text_route(user_input: UserInput):
#     """
#     Route to process the text input for intent and entity recognition.
#     """
#     try:
#         # Extract user text from the request body
#         user_text = user_input.text.lower()

#         # Process the text for intent and entity recognition
#         response = process_text(user_text)

#         return {"response": response}
#     except Exception as e:
#         # Handle exceptions and return error details
#         raise HTTPException(status_code=500, detail=str(e))


# @app.get("/")
# async def root():
#     """
#     Default route to check if the API is running.
#     """
#     return {"message": "FastAPI server is running!"}


# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from entity_recognition.intent_recognition import process_text

# # Initialize FastAPI app
# app = FastAPI()

# # Pydantic model to validate input, including an optional user_id for context
# class UserInput(BaseModel):
#     user_id: str = "default_user"
#     text: str

# @app.post("/process-text")
# async def process_text_route(user_input: UserInput):
#     """
#     Route to process the text input for intent, entity recognition, and conversation context.
#     """
#     try:
#         # Lowercase the user text (processing will also handle cleaning)
#         user_text = user_input.text.lower()
        
#         # Process the text for intent and entity recognition, including conversation context handling
#         response = process_text(user_text, user_id=user_input.user_id)
        
#         return {"response": response}
#     except Exception as e:
#         # Return a 500 error with details if something goes wrong
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/")
# async def root():
#     """
#     Default route to check if the API is running.
#     """
#     return {"message": "FastAPI server is running!"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
# from pydantic import BaseModel
# import json
# from entity_recognition.intent_recognition import process_text

# # Initialize FastAPI app
# app = FastAPI()

# # Pydantic model to validate HTTP input, including an optional user_id for context
# class UserInput(BaseModel):
#     user_id: str = "default_user"
#     text: str

# @app.post("/process-text")
# async def process_text_route(user_input: UserInput):
#     """
#     HTTP Route to process the text input for intent and entity recognition.
#     """
#     try:
#         # Lowercase the user text
#         user_text = user_input.text.lower()
        
#         # Process the text for intent and entity recognition
#         # response = process_text(user_text, user_id=user_input.user_id)
#         response = process_text(user_text)

        
#         return {"response": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/")
# async def root():
#     """
#     Default route to check if the API is running.
#     """
#     return {"message": "FastAPI server is running!"}

# # WebSocket endpoint for real-time voice command processing
# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     print("🔌 WebSocket connection accepted")
#     try:
#         while True:
#             # Receive text command from the client
#             data = await websocket.receive_text()
#             print(f"📩 WebSocket received: {data}")
            
#             # Process the text using the same NLP function (default user_id used here)
#             response = process_text(data.lower())
            
#             # Send the response back as a JSON string
#             await websocket.send_text(json.dumps({"response": response}))
#             print(f"📤 WebSocket sent: {json.dumps({'response': response})}")
#     except WebSocketDisconnect:
#         print("🔴 WebSocket disconnected")
#     except Exception as e:
#         print(f"⚠️ WebSocket error: {e}")


# # @app.websocket("/ws")
# # async def websocket_endpoint(websocket: WebSocket):
# #     await websocket.accept()
# #     while True:
# #         data = await websocket.receive_text()
# #         await websocket.send_text(f"Echo: {data}")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)





from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import json
from entity_recognition.intent_recognition import process_text
import json
import logging

# Setup logger
logger = logging.getLogger("websocket")
logger.setLevel(logging.INFO)
app = FastAPI()

class UserInput(BaseModel):
    user_id: str = "default_user"
    text: str

@app.post("/process-text")
async def process_text_route(user_input: UserInput):
    """
    HTTP route to process text input for intent and entity recognition.
    """
    try:
        user_text = user_input.text.lower()
        response = process_text(user_text, user_id=user_input.user_id)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """
    Default route to check if the API is running.
    """
    return {"message": "FastAPI server is running!"}

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     print("🔌 WebSocket connection accepted")
#     try:
#         while True:
#             data = await websocket.receive_text()
#             print(f"📩 WebSocket received: {data}")
#             try:
#                 # Try to parse incoming message as JSON
#                 data_json = json.loads(data)
#                 text = data_json.get("text", "").lower()
#                 user_id = data_json.get("user_id", "default_user")
#             except json.JSONDecodeError:
#                 # If not valid JSON, treat entire message as text
#                 text = data.lower()
#                 user_id = "default_user"
                
#             # Process the text using the intent recognition logic
#             response = process_text(text, user_id=user_id)
#             response_json = json.dumps({"response": response})
#             await websocket.send_text(response_json)
#             print(f"📤 WebSocket sent: {response_json}")
#     except WebSocketDisconnect:
#         print("🔴 WebSocket disconnected")
#     except Exception as e:
#         print(f"⚠️ WebSocket error: {e}")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("🔌 WebSocket connection accepted")
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"📩 Received: {data}")
            try:
                data_json = json.loads(data)
                text = data_json.get("text", "").strip().lower()
                user_id = data_json.get("user_id", "default_user")
            except json.JSONDecodeError:
                text = data.strip().lower()
                user_id = "default_user"
            
            if not text:
                await websocket.send_text(json.dumps({"error": "Empty message received"}))
                continue

            try:
                response = process_text(text, user_id=user_id)
            except Exception as e:
                logger.error(f"Error processing text: {e}")
                response = {"intent": "fallback", "entities": {}, "message": "Sorry, something went wrong."}
            
            response_json = json.dumps({"response": response})
            await websocket.send_text(response_json)
            logger.info(f"📤 Sent: {response_json}")
            print(f"📤 WebSocket sent: {response_json}")
    except WebSocketDisconnect:
        logger.info("🔴 WebSocket disconnected")
    except Exception as e:
        logger.error(f"⚠️ WebSocket error: {e}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
