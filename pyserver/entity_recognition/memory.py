# memory.py
# In-memory dictionary to store user session data
user_memory = {}

def initialize_user_memory(user_id):
    if user_id not in user_memory:
        user_memory[user_id] = {
            "visited_products": [],  # last 5-10 products
            "current_product": None,
            "previous_product": None,
            "cart": [],
            "wishlist": [],
            "current_intent": None,       # added current intent field
            "previous_intents": []        # added array of previous intents
            # Additional fields (e.g., order tracking, addresses) can be added here.
        }

def update_product_memory(user_id, product):
    """
    Update the product context:
      - Shift the current product to previous.
      - Set the new product as current.
      - Append to visited products (limit to 10).
    """
    initialize_user_memory(user_id)
    mem = user_memory[user_id]
    if mem["current_product"]:
        mem["previous_product"] = mem["current_product"]
    mem["current_product"] = product
    mem["visited_products"].append(product)
    if len(mem["visited_products"]) > 10:
        mem["visited_products"] = mem["visited_products"][-10:]
    print(user_memory, "user memory")

def get_current_product(user_id):
    initialize_user_memory(user_id)
    return user_memory[user_id]["current_product"]

def get_previous_product(user_id):
    initialize_user_memory(user_id)
    return user_memory[user_id]["previous_product"]

def add_to_cart(user_id, product):
    initialize_user_memory(user_id)
    user_memory[user_id]["cart"].append(product)

def add_to_wishlist(user_id, product):
    initialize_user_memory(user_id)
    user_memory[user_id]["wishlist"].append(product)

def update_user_intent(user_id, new_intent):
    """
    Update the user intent:
      - If there is a current intent and it differs from new_intent,
        then add the current intent to the previous intents.
      - Set the new_intent as the current intent.
    """
    initialize_user_memory(user_id)
    mem = user_memory[user_id]
    if mem["current_intent"] and mem["current_intent"] != new_intent:
        mem["previous_intents"].append(mem["current_intent"])
    mem["current_intent"] = new_intent
