
# from .model import predict_intent
# from .preprocess import clean_text
# import re

# def process_text(text, user_id="default_user"):
#     """
#     Processes user input text, determines intent, and extracts entities.
#     If the input suggests a category view (e.g. "show me lights for my bedroom"),
#     the function extracts the target category and returns a view_category response.
#     """
#     cleaned_text = clean_text(text)
#     intent = predict_intent(cleaned_text)
#     response = {"intent": intent, "entities": {}}
#     print("Original text:", text)
#     print("Cleaned text:", cleaned_text)
#     print("Predicted intent:", intent)
    
#     def extract_category_or_item(pattern, text):
#         match = re.search(pattern, text, re.IGNORECASE)
#         return match.group("target").strip() if match else ""
    
#     if intent == "add_to_cart":
#         match = re.search(r'add\s+(?P<item>.+?)\s+to', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Adding {item} to your cart." if item else "Item to add not specified."
#         response["entities"]["item"] = item

#     elif intent == "remove_from_cart":
#         match = re.search(r'remove\s+(?P<item>.+?)\s+from', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Removing {item} from your cart." if item else "Item to remove not specified."
#         response["entities"]["item"] = item

#     elif intent == "view_cart":
#         response["message"] = "Here are the items in your cart."

#     # Update view_product intent to handle category extraction if input indicates it.
#     elif intent == "view_product":
#         # Check if the text contains "show me" and a "for/in" clause.
#         if re.search(r"show me .* (for|in)", cleaned_text, re.IGNORECASE):
#             extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#             category = extracted if extracted else ""
#             if category:
#                 response["message"] = f"Showing products in the {category} category."
#                 response["entities"]["category"] = category
#                 # Optionally override intent if desired:
#                 response["intent"] = "view_category"
#             else:
#                 response["message"] = "Category not specified."
#         else:
#             # Fallback to extracting product details
#             match = re.search(r'(?:about|price\s+of)\s+(?P<item>.+)', cleaned_text, re.IGNORECASE)
#             item = match.group("item").strip() if match else ""
#             response["message"] = f"Showing details for {item}." if item else "Product details not specified."
#             response["entities"]["item"] = item

#     elif intent == "checkout":
#         response["message"] = "Proceeding to checkout."

#     elif intent == "recommend_product":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else "smart home"
#         response["message"] = f"Recommending products in the {category} category."
#         response["entities"]["category"] = category

#     elif intent == "product_support":
#         match = re.search(r'(?:help with|assist(?: me)? with(?: setting up)?)\s+my\s+(?P<item>.+)', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Providing support for {item}." if item else "Product support not specified."
#         response["entities"]["item"] = item

#     elif intent == "cancel_order":
#         match = re.search(r'cancel\s+(?:my\s+order|the\s+(?P<item>.+))', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match and match.group("item") else ""
#         if item:
#             response["message"] = f"Cancelling your order for {item}."
#             response["entities"]["item"] = item
#         else:
#             response["message"] = "Cancelling your order."

#     elif intent == "view_products":
#         # Try to extract a category from phrases like "list gadgets for my bedroom"
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         if extracted:
#             response["message"] = f"Listing available products in the {extracted} category."
#             response["entities"]["category"] = extracted
#         else:
#             response["message"] = "Listing all available products."


#     elif intent == "view_category":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else ""
#         if category:
#             response["message"] = f"Showing products in the {category} category."
#             response["entities"]["category"] = category
#         else:
#             response["message"] = "Category not specified."

#     elif intent == "search_products":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else ""
#         if category:
#             response["message"] = f"Searching for products in the {category} category."
#             response["entities"]["category"] = category
#         else:
#             response["message"] = "Search category not specified."

#     elif intent == "product_pitch":
#         response["message"] = "Here is more information about the product."

#     else:
#         response["message"] = "Sorry, I didn't understand that command."
    
#     return response



# from .model import predict_intent
# from .preprocess import clean_text
# import re

# def process_text(text, user_id="default_user"):
#     """
#     Processes user input text, determines intent, and extracts target information.
#     Handles various commands including greeting, cart operations, product views,
#     comparisons, etc.
#     """
#     cleaned_text = clean_text(text)
#     intent = predict_intent(cleaned_text)
#     response = {"intent": intent, "entities": {}}
#     print("Original text:", text)
#     print("Cleaned text:", cleaned_text)
#     print("Predicted intent:", intent)
    
#     def extract_category_or_item(pattern, text):
#         match = re.search(pattern, text, re.IGNORECASE)
#         return match.group("target").strip() if match else ""
    
#     if intent == "greeting":
#         response["message"] = "Hello! How can I assist you today?"
    
#     elif intent == "add_to_cart":
#         match = re.search(r'add\s+(?P<item>.+?)\s+(?:to|in)\s+(?:my\s+)?cart', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Adding {item} to your cart." if item else "Item to add not specified."
#         response["entities"]["item"] = item

#     elif intent == "remove_from_cart":
#         match = re.search(r'remove\s+(?P<item>.+?)\s+(?:from|in)\s+(?:my\s+)?cart', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Removing {item} from your cart." if item else "Item to remove not specified."
#         response["entities"]["item"] = item

#     elif intent == "view_cart":
#         response["message"] = "Here are the items in your cart."

#     elif intent == "view_product":
#         if re.search(r"show me .* (for|in)", cleaned_text, re.IGNORECASE):
#             extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#             category = extracted if extracted else ""
#             if category:
#                 response["message"] = f"Showing products in the {category} category."
#                 response["entities"]["category"] = category
#                 response["intent"] = "view_category"
#             else:
#                 response["message"] = "Category not specified."
#         else:
#             match = re.search(r'(?:about|price\s+of)\s+(?P<item>.+)', cleaned_text, re.IGNORECASE)
#             item = match.group("item").strip() if match else ""
#             response["message"] = f"Showing details for {item}." if item else "Product details not specified."
#             response["entities"]["item"] = item

#     elif intent == "checkout":
#         response["message"] = "Proceeding to checkout."

#     elif intent == "recommend_product":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else "smart home"
#         response["message"] = f"Recommending products in the {category} category."
#         response["entities"]["category"] = category

#     elif intent == "product_support":
#         match = re.search(r'(?:help with|assist(?: me)? with(?: setting up)?)\s+my\s+(?P<item>.+)', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match else ""
#         response["message"] = f"Providing support for {item}." if item else "Product support not specified."
#         response["entities"]["item"] = item

#     elif intent == "cancel_order":
#         match = re.search(r'cancel\s+(?:my\s+order|the\s+(?P<item>.+))', cleaned_text, re.IGNORECASE)
#         item = match.group("item").strip() if match and match.group("item") else ""
#         if item:
#             response["message"] = f"Cancelling your order for {item}."
#             response["entities"]["item"] = item
#         else:
#             response["message"] = "Cancelling your order."

#     elif intent == "view_products":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         if extracted:
#             response["message"] = f"Listing available products in the {extracted} category."
#             response["entities"]["category"] = extracted
#         else:
#             response["message"] = "Listing all available products."

#     elif intent == "view_category":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else ""
#         if category:
#             response["message"] = f"Showing products in the {category} category."
#             response["entities"]["category"] = category
#         else:
#             response["message"] = "Category not specified."

#     elif intent == "search_products":
#         extracted = extract_category_or_item(r'(?:for|in)\s+(?P<target>.+)', cleaned_text)
#         category = extracted if extracted else ""
#         if category:
#             response["message"] = f"Searching for products in the {category} category."
#             response["entities"]["category"] = category
#         else:
#             response["message"] = "Search category not specified."

#     elif intent == "compare_products":
#         match = re.search(r'compare\s+(?P<product1>.+?)\s+(?:and|vs|versus)\s+(?P<product2>.+)', cleaned_text, re.IGNORECASE)
#         if match:
#             product1 = match.group("product1").strip()
#             product2 = match.group("product2").strip()
#             response["message"] = f"Comparing {product1} and {product2}."
#             response["entities"]["product1"] = product1
#             response["entities"]["product2"] = product2
#         else:
#             response["message"] = "Please specify two products for comparison."

#     elif intent == "product_pitch":
#         response["message"] = "Here is more information about the product."

#     elif intent == "checkout_help":
#         response["message"] = "Let me guide you through checkout."

#     elif intent == "feedback":
#         response["message"] = "Thank you for your feedback!"

#     else:
#         response["message"] = "Sorry, I didn't understand that command."
    
#     return response



# from .model import predict_intent
# from .preprocess import clean_text
# import re

# def process_text(text, user_id="default_user"):
#     """
#     Processes user input text, determines intent, and extracts target information.
#     This version focuses on the compare_products intent.
#     """
#     cleaned_text = clean_text(text)
#     intent = predict_intent(cleaned_text)
#     response = {"intent": intent, "entities": {}}
#     print("Original text:", text)
#     print("Cleaned text:", cleaned_text)
#     print("Predicted intent:", intent)
    
#     def extract_products(pattern, text):
#         match = re.search(pattern, text, re.IGNORECASE)
#         if match:
#             return match.group("product1").strip(), match.group("product2").strip()
#         return "", ""
    
#     if intent == "compare_products":
#         product1, product2 = extract_products(r'compare\s+(?P<product1>.+?)\s+(?:and|vs|versus)\s+(?P<product2>.+)', cleaned_text)
#         if product1 and product2:
#             response["message"] = f"Comparing {product1} and {product2}."
#             response["entities"]["product1"] = product1
#             response["entities"]["product2"] = product2
#         else:
#             response["message"] = "Please specify two products for comparison."
#     else:
#         response["message"] = "Sorry, I didn't understand that command."
    
#     return response




# from .model import predict_intent
# from .preprocess import clean_text
# import re

# def process_text(text, user_id="default_user"):
#     """
#     Processes user input text, determines intent, and extracts relevant information.
#     Handles intents like 'compare_products', 'add_to_cart', 'add_to_wishlist', 'checkout', and 'track_order'.
#     """
#     cleaned_text = clean_text(text)
#     intent = predict_intent(cleaned_text)
#     response = {"intent": intent, "entities": {}, "message": ""}

#     print("Original text:", text)
#     print("Cleaned text:", cleaned_text)
#     print("Predicted intent:", intent)

#     # Utility function to extract product name
#     def extract_product_name(text):
#         match = re.search(r'add\s+(?P<product>[\w\s]+)', text, re.IGNORECASE)
#         return match.group("product").strip() if match else None

#     # Utility function to extract order number
#     def extract_order_number(text):
#         match = re.search(r'order\s+number\s*(?P<order_number>\d+)', text, re.IGNORECASE)
#         return match.group("order_number") if match else None

#     # Intent Handling
#     if intent == "compare_products":
#         match = re.search(r'compare\s+(?P<product1>[\w\s]+)\s+(?:and|vs|versus)\s+(?P<product2>[\w\s]+)', cleaned_text, re.IGNORECASE)
#         if match:
#             product1, product2 = match.group("product1").strip(), match.group("product2").strip()
#             response["entities"] = {"product1": product1, "product2": product2}
#             response["message"] = f"Comparing {product1} and {product2}."
#         else:
#             response["message"] = "Please specify two products for comparison."

#     elif intent == "add_to_cart":
#         product = extract_product_name(cleaned_text)
#         if product:
#             response["entities"]["product"] = product
#             response["message"] = f"{product} has been added to your cart."
#         else:
#             response["message"] = "Please specify which product to add to the cart."

#     elif intent == "add_to_wishlist":
#         product = extract_product_name(cleaned_text)
#         if product:
#             response["entities"]["product"] = product
#             response["message"] = f"{product} has been added to your wishlist."
#         else:
#             response["message"] = "Please specify which product to add to the wishlist."

#     elif intent == "checkout":
#         response["message"] = "Proceeding to checkout. Please review your cart."

#     elif intent == "track_order":
#         order_number = extract_order_number(cleaned_text)
#         if order_number:
#             response["entities"]["order_number"] = order_number
#             response["message"] = f"Tracking order #{order_number}. Retrieving status..."
#         else:
#             response["message"] = "Please provide your order number to track your order."

#     else:
#         response["message"] = "Sorry, I didn't understand that command."

#     return response




# from .model import predict_intent
# from .preprocess import clean_text
# from .memory import update_product_memory, get_current_product, get_previous_product, add_to_cart, add_to_wishlist
# import re

# def process_text(text, user_id="default_user"):
#     """
#     Processes user input text using the intent recognition model, then leverages 
#     session memory for context-aware responses.
#     """
#     cleaned_text = clean_text(text)
#     intent = predict_intent(cleaned_text)
#     response = {"intent": intent, "entities": {}, "message": ""}
#     print("Original text:", text)
#     print("Cleaned text:", cleaned_text)
#     print("Predicted intent:", intent)
    
#     # Helper functions
#     def extract_products(pattern, text):
#         match = re.search(pattern, text, re.IGNORECASE)
#         if match:
#             return match.group("product1").strip(), match.group("product2").strip()
#         return "", ""
    
#     def extract_product_name(text):
#         match = re.search(r'add\s+(?P<product>[\w\s]+)', text, re.IGNORECASE)
#         return match.group("product").strip() if match else None

#     def extract_order_number(text):
#         match = re.search(r'order\s+number\s*(?P<order_number>\d+)', text, re.IGNORECASE)
#         return match.group("order_number") if match else None
    
#     if intent == "product_pitch":
#         # Update memory with the viewed product.
#         product = cleaned_text.replace("show me", "").strip()
#         update_product_memory(user_id, product)
#         response["message"] = f"Displaying details for {product}."
#         response["entities"]["product"] = product
    
#     elif intent == "add_to_cart":
#         product = get_current_product(user_id)
#         if product:
#             add_to_cart(user_id, product)
#             response["message"] = f"Added {product} to your cart."
#             response["entities"]["product"] = product
#         else:
#             product = extract_product_name(cleaned_text)
#             if product:
#                 add_to_cart(user_id, product)
#                 response["message"] = f"Added {product} to your cart."
#                 response["entities"]["product"] = product
#             else:
#                 response["message"] = "No product in context to add to your cart."
    
#     elif intent == "add_to_wishlist":
#         product = get_current_product(user_id)
#         if product:
#             add_to_wishlist(user_id, product)
#             response["message"] = f"Added {product} to your wishlist."
#             response["entities"]["product"] = product
#         else:
#             product = extract_product_name(cleaned_text)
#             if product:
#                 add_to_wishlist(user_id, product)
#                 response["message"] = f"Added {product} to your wishlist."
#                 response["entities"]["product"] = product
#             else:
#                 response["message"] = "No product in context to add to your wishlist."
    
#     elif intent == "compare_products":
#         # Handle "this" and "previous" context
#         if "this" in cleaned_text and "previous" in cleaned_text:
#             current = get_current_product(user_id)
#             previous = get_previous_product(user_id)
#             if current and previous:
#                 response["message"] = f"Comparing {current} with {previous}."
#                 response["entities"] = {"current_product": current, "previous_product": previous}
#             else:
#                 response["message"] = "Insufficient context to compare products."
#         else:
#             product1, product2 = extract_products(
#                 r'compare\s+(?P<product1>.+?)\s+(?:and|vs|versus)\s+(?P<product2>.+)', 
#                 cleaned_text
#             )
#             if product1 and product2:
#                 update_product_memory(user_id, product2)
#                 response["message"] = f"Comparing {product1} and {product2}."
#                 response["entities"] = {"product1": product1, "product2": product2}
#             else:
#                 response["message"] = "Please specify two products for comparison."
    
#     elif intent == "checkout":
#         response["message"] = "Proceeding to checkout. Would you like to review your cart or add a new address?"
    
#     elif intent == "order_status" or intent == "track_order":
#         order_number = extract_order_number(cleaned_text)
#         if order_number:
#             response["entities"]["order_number"] = order_number
#             response["message"] = f"Tracking order #{order_number}. Retrieving status..."
#         else:
#             response["message"] = "Please provide your order number to track your order."
    
#     elif intent == "feedback":
#         response["message"] = "Thank you for your feedback!"
    
#     else:
#         response["message"] = "Sorry, I didn't understand that command."
    
#     return response




from .model import predict_intent
from .preprocess import clean_text
from .memory import update_product_memory, get_current_product, get_previous_product, add_to_cart, add_to_wishlist,user_memory,update_user_intent
import re

def process_text(text, user_id="default_user"):
    """
    Processes user input text using the intent recognition model and memory functionality.
    Recognizes intents like adding to cart/wishlist or retrieving cart/wishlist.
    Memory is updated with the latest product context when applicable.
    """
    cleaned_text = clean_text(text)
    
    # Helper function to extract product name from text.
    def extract_product_name(text):
        match = re.search(
            r'(?:add\s+(?:that|this|the|my|a|an)?\s*)?(?P<product>.+?)(?=\s+(?:to|in\s+(?:my\s+)?(?:cart|wishlist))\b)',
            text,
            re.IGNORECASE
        )
        return match.group("product").strip() if match else None

    def extract_order_number(text):
        match = re.search(r'order\s+number\s*(?P<order_number>\d+)', text, re.IGNORECASE)
        return match.group("order_number") if match else None
    def extract_order_number(text):
        match = re.search(r'order\s+number\s*(?P<order_number>\d+)', text, re.IGNORECASE)
        return match.group("order_number") if match else None

    # Detect intent based on keywords in the cleaned text.
    if "add" in cleaned_text.lower() and "cart" in cleaned_text.lower():
        intent = "add_to_cart"
    elif "add" in cleaned_text.lower() and "wishlist" in cleaned_text.lower():
        intent = "add_to_wishlist"
    elif (("show" in cleaned_text.lower() or "lets see" in cleaned_text.lower() or "item in my cart" in cleaned_text.lower()) 
          and "cart" in cleaned_text.lower()):
        intent = "visit_cart"
    elif (("show" in cleaned_text.lower() or "lets see" in cleaned_text.lower() or "item in my wishlist" in cleaned_text.lower()) 
          and "wishlist" in cleaned_text.lower()):
        intent = "visit_wishlist"
    elif "show" in cleaned_text.lower() and "this" in cleaned_text.lower():
        product = extract_product_name(cleaned_text)
        if not product:
            product = get_current_product(user_id)
        if product:
            intent = "product_pitch"
    else:
        intent = None

    response = {"intent": intent, "entities": {}, "message": ""}
    print("Original text:", text)
    print("Cleaned text:", cleaned_text)
    print("Predicted intent:", intent)
    
    
    
    if intent == "add_to_cart":
        # Try to extract product name from the text.
        product = extract_product_name(cleaned_text)
        # If not explicitly mentioned, try to use the current product from memory.
        if not product:
            product = get_current_product(user_id)
        if product:
            add_to_cart(user_id, product)
            update_user_intent(user_id, intent) 
            update_product_memory(user_id,product) # Using the update intent function from memory.
            response["message"] = f"Added {product} to your cart."
            response["entities"]["product"] = product
        else:
            response["message"] = "Product name not found in text."
    elif intent == "add_to_wishlist":
        # Use the current product in memory or try to extract it.
        product = get_current_product(user_id)
        if not product:
            product = extract_product_name(cleaned_text)
        if product:
            add_to_wishlist(user_id, product)
            update_user_intent(user_id, intent)  # Using the update intent function from memory.
            update_product_memory(user_id,product)
            response["message"] = f"Added {product} to your wishlist."
            response["entities"]["product"] = product
        else:
            response["message"] = "Product name not found in text."
    elif intent == "visit_cart":
        response["message"] = "Here are the items in your cart."
    elif intent == "visit_wishlist":
        response["message"] = "Here are the items in your wishlist."
    elif intent == "product_pitch":
        response["message"] = f"let me show you this product"
    else:
        response["message"] = "Command not recognized."

    print(user_memory, "usermemory ")
    return response