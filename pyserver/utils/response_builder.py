def build_response(intent, entities=None):
    """
    Generates a dynamic response based on intent and entities.
    """
    if intent == "add_to_cart":
        item = entities.get("item", "something")
        return f"Adding {item} to your cart."
    elif intent == "remove_from_cart":
        item = entities.get("item", "something")
        return f"Removing {item} from your cart."
    elif intent == "view_cart":
        return "Here are the items in your cart."
    elif intent == "greeting":
        return "Hello! How can I assist you today?"
    else:
        return "I'm sorry, I didn't understand that command."
