#conversation_manager.py

# A simple in-memory conversation context store.
# In production, consider using persistent storage.
conversation_context = {}

def get_context(user_id):
    """Retrieve conversation context for a given user."""
    return conversation_context.get(user_id, [])

def update_context(user_id, user_message, assistant_response):
    """Append the latest turn to the user's conversation history."""
    if user_id not in conversation_context:
        conversation_context[user_id] = []
    conversation_context[user_id].append({
        "user": user_message,
        "assistant": assistant_response
    })

def clear_context(user_id):
    """Clear the conversation context for a user."""
    conversation_context[user_id] = []
