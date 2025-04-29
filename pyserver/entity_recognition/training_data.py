
# TRAINING_DATA = [
#     # ================================
#     # 1. Add to Cart Intent
#     # ================================
#     ("add smart speaker to my cart", {"intent": "add_to_cart", "entities": {"item": "smart speaker"}}),
#     ("please add smart speaker to my cart", {"intent": "add_to_cart", "entities": {"item": "smart speaker"}}),
#     ("add robot vacuum cleaner to my cart", {"intent": "add_to_cart", "entities": {"item": "robot vacuum cleaner"}}),
#     ("could you add AI security camera to my cart", {"intent": "add_to_cart", "entities": {"item": "AI security camera"}}),
#     ("I want to add my new smartwatch to my cart", {"intent": "add_to_cart", "entities": {"item": "smartwatch"}}),
#     ("add my smartwatch to the cart", {"intent": "add_to_cart", "entities": {"item": "smartwatch"}}),

#     # ================================
#     # 2. Remove from Cart Intent
#     # ================================
#     ("remove smart light from my cart", {"intent": "remove_from_cart", "entities": {"item": "smart light"}}),
#     ("please remove smart thermostat from my cart", {"intent": "remove_from_cart", "entities": {"item": "smart thermostat"}}),
#     ("delete my smart speaker from cart", {"intent": "remove_from_cart", "entities": {"item": "smart speaker"}}),
#     ("I want to remove my robot vacuum from the cart", {"intent": "remove_from_cart", "entities": {"item": "robot vacuum cleaner"}}),
#     ("remove my smartwatch from cart", {"intent": "remove_from_cart", "entities": {"item": "smartwatch"}}),

#     # ================================
#     # 3. View Cart Intent
#     # ================================
#     ("show me the items in my cart", {"intent": "view_cart", "entities": {}}),
#     ("what's in my cart", {"intent": "view_cart", "entities": {}}),
#     ("list the items in my cart", {"intent": "view_cart", "entities": {}}),
#     ("display my shopping cart", {"intent": "view_cart", "entities": {}}),
#     ("please show my cart", {"intent": "view_cart", "entities": {}}),
#     ("could you display the contents of my cart", {"intent": "view_cart", "entities": {}}),
#     ("what are the items currently in my cart", {"intent": "view_cart", "entities": {}}),

#     # ================================
#     # 4. Checkout Intent
#     # ================================
#     ("checkout my cart", {"intent": "checkout", "entities": {}}),
#     ("place my order", {"intent": "checkout", "entities": {}}),
#     ("proceed to checkout", {"intent": "checkout", "entities": {}}),
#     ("I want to checkout", {"intent": "checkout", "entities": {}}),
#     ("let me check out my cart", {"intent": "checkout", "entities": {}}),
#     ("finish my order", {"intent": "checkout", "entities": {}}),

#     # ================================
#     # 5. View Product Details Intent
#     # ================================
#     ("tell me about the robot vacuum cleaner", {"intent": "view_product", "entities": {"item": "robot vacuum cleaner"}}),
#     ("what is the price of the smart speaker", {"intent": "view_product", "entities": {"item": "smart speaker"}}),
#     ("show details of the AI security camera", {"intent": "view_product", "entities": {"item": "AI security camera"}}),
#     ("I want to know more about the smartwatch", {"intent": "view_product", "entities": {"item": "smartwatch"}}),
#     ("give me info on the smart speaker", {"intent": "view_product", "entities": {"item": "smart speaker"}}),

#     # ================================
#     # 6. Recommend Product Intent
#     # ================================
#     ("recommend me a smart thermostat", {"intent": "recommend_product", "entities": {"category": "smart home"}}),
#     ("suggest a high-tech smart speaker", {"intent": "recommend_product", "entities": {"category": "smart home"}}),
#     ("what should I buy for my living room", {"intent": "recommend_product", "entities": {"category": "living room"}}),
#     ("I need recommendations for office gadgets", {"intent": "recommend_product", "entities": {"category": "office"}}),
#     ("what are some good gadgets for my bedroom", {"intent": "recommend_product", "entities": {"category": "bedroom"}}),
#     ("any suggestions for kitchen devices", {"intent": "recommend_product", "entities": {"category": "kitchen"}}),

#     # ================================
#     # 7. Product Support Intent
#     # ================================
#     ("I need help with my smart light", {"intent": "product_support", "entities": {"item": "smart light"}}),
#     ("assist me with setting up my AI security camera", {"intent": "product_support", "entities": {"item": "AI security camera"}}),
#     ("how do I configure my smart light", {"intent": "product_support", "entities": {"item": "smart light"}}),
#     ("can you help me set up my AI security camera", {"intent": "product_support", "entities": {"item": "AI security camera"}}),
#     ("I need support for my smartwatch", {"intent": "product_support", "entities": {"item": "smartwatch"}}),

#     # ================================
#     # 8. Cancel Order Intent
#     # ================================
#     ("cancel my order", {"intent": "cancel_order", "entities": {}}),
#     ("I want to cancel the smart light", {"intent": "cancel_order", "entities": {"item": "smart light"}}),
#     ("please cancel my order", {"intent": "cancel_order", "entities": {}}),
#     ("abort my order", {"intent": "cancel_order", "entities": {}}),

#     # ================================
#     # 9. View Products / Listing Intent
#     # ================================
#     ("what gadgets do you have", {"intent": "view_products", "entities": {}}),
#     ("show me all smart home devices", {"intent": "view_category", "entities": {"category": "smart home"}}),
#     ("I want to search for AI gadgets", {"intent": "search_products", "entities": {"category": "AI gadgets"}}),
#     ("display all office devices", {"intent": "view_category", "entities": {"category": "office"}}),
#     ("list available gadgets", {"intent": "view_products", "entities": {}}),

#     # ================================
#     # 10. Product Pitch Conversations
#     # ================================
#     ("Customer: I'm browsing your website for some smart home upgrades. Can you tell me more about your smart thermostat?\nAssistant: Our smart thermostat adjusts to your routines, saving energy and money. It also integrates with other smart devices for seamless control.",
#      {"intent": "product_pitch", "entities": {"item": "smart thermostat", "features": "auto-scheduling, energy saving", "benefits": "convenience, cost reduction"}}),
#     ("Customer: What makes your smart speaker so special?\nAssistant: Our smart speaker offers crystal-clear audio, seamless voice control, and easy integration with your other devices, ensuring an immersive entertainment experience.",
#      {"intent": "product_pitch", "entities": {"item": "smart speaker", "features": "voice control, high fidelity audio", "benefits": "enhanced entertainment, device integration"}}),
#     ("Customer: Tell me more about the AI security camera. Does it have night vision?\nAssistant: Yes, our AI security camera features advanced night vision and smart alerts, ensuring your home is safe even in low light conditions.",
#      {"intent": "product_pitch", "entities": {"item": "AI security camera", "features": "night vision, smart alerts", "benefits": "enhanced security, 24/7 monitoring"}}),
#     ("Customer: I'm interested in your robot vacuum cleaner. How efficient is it?\nAssistant: Our robot vacuum cleaner is equipped with intelligent mapping and scheduled cleaning, ensuring thorough cleaning with minimal effort on your part.",
#      {"intent": "product_pitch", "entities": {"item": "robot vacuum cleaner", "features": "intelligent mapping, scheduled cleaning", "benefits": "convenience, efficient cleaning"}}),
#     ("Customer: I'm considering the smart light for my living room. Can it sync with my music system?\nAssistant: Absolutely, the smart light can sync with your music for dynamic light shows, elevating your ambiance to the next level.",
#      {"intent": "product_pitch", "entities": {"item": "smart light", "features": "music sync, dynamic lighting", "benefits": "enhanced ambiance, entertainment"}}),
    
#     # ================================
#     # 11. Fallback / Unrecognized Intent
#     # ================================
#     ("I don't understand", {"intent": "fallback", "entities": {}})
# ]



# TRAINING_DATA = [
#     # Explicit comparisons
#     ("Compare <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("What's the difference between <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("Show me <PRODUCT> vs <PRODUCT>", {"intent": "compare_products"}),
#     ("How does <PRODUCT> stack up against <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which is better: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Between <PRODUCT> and <PRODUCT>, which one is better?", {"intent": "compare_products"}),
#     ("Which one offers more value: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Is <PRODUCT> better than <PRODUCT>?", {"intent": "compare_products"}),

#     # Implicit comparisons
#     ("Looking at <PRODUCT> and <PRODUCT> features", {"intent": "compare_products"}),
#     ("<PRODUCT> versus <PRODUCT> specs", {"intent": "compare_products"}),
#     ("Differences between these items", {"intent": "compare_products"}),
#     ("Which one should I choose: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Technical comparison of <PRODUCT> with <PRODUCT>", {"intent": "compare_products"}),
#     ("Compare the specs of <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("Which device has better features: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),

#     # Multi-product comparisons
#     ("Compare <PRODUCT>, <PRODUCT>, and <PRODUCT>", {"intent": "compare_products"}),
#     ("Show all three variants side by side", {"intent": "compare_products"}),
#     ("Which among these is best: <PRODUCT>, <PRODUCT>, <PRODUCT>?", {"intent": "compare_products"}),
#     ("Compare multiple products: <PRODUCT>, <PRODUCT>, and <PRODUCT>", {"intent": "compare_products"}),
#     ("I need a comparison between <PRODUCT>, <PRODUCT>, and <PRODUCT>", {"intent": "compare_products"}),
    
#     # Follow-up comparisons
#     ("How about compared to <PRODUCT>?", {"intent": "compare_products"}),
#     ("Add <PRODUCT> to the comparison", {"intent": "compare_products"}),
#     ("Show me alternatives to <PRODUCT>", {"intent": "compare_products"}),

#     # Price-based comparisons
#     ("Which one is cheaper: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Compare the prices of <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("Which product has better value for money: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Is <PRODUCT> worth the extra cost over <PRODUCT>?", {"intent": "compare_products"}),
#     ("Price difference between <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),

#     # Feature-based comparisons
#     ("Which has a better camera: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Compare battery life of <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("Which device has better performance: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which is more powerful: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which one has better display quality: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Does <PRODUCT> have a better processor than <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which is more durable: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),

#     # Review-based comparisons
#     ("Which one has better user reviews: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("What do customers say about <PRODUCT> vs <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which product has higher ratings: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which is more recommended: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),

#     # Usage-based comparisons
#     ("Which is better for gaming: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which is better for office work: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("For students, which is better: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which laptop is better for programming: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Which phone is better for photography: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),

#     # Brand-related comparisons
#     ("Is <PRODUCT> better than <PRODUCT> from <BRAND>?", {"intent": "compare_products"}),
#     ("How does <PRODUCT> from <BRAND> compare to <PRODUCT> from <BRAND>?", {"intent": "compare_products"}),
#     ("Which brand has better quality: <BRAND> or <BRAND>?", {"intent": "compare_products"}),

#     # Final decision questions
#     ("Help me decide between <PRODUCT> and <PRODUCT>", {"intent": "compare_products"}),
#     ("Which one would you recommend: <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
#     ("Should I go for <PRODUCT> or <PRODUCT>?", {"intent": "compare_products"}),
# ]




# TRAINING_DATA = {
#     # 1. Greeting Intent
#     "greeting": [
#         "hello",
#         "hi",
#         "hey there",
#         "good morning",
#         "good afternoon",
#         "greetings",
#         "howdy",
#         "hey, how are you",
#         "hello, how can you help me",
#         "hi, what can you do",
#         "good day"
#     ],
#     # 2. Product Search Intent
#     "product_search": [
#         "I want to buy a new phone",
#         "show me products",
#         "I'm looking for a laptop",
#         "find me some headphones",
#         "need a new tablet",
#         "search for smart devices",
#         "what products do you have",
#         "find me a gaming laptop"
#     ],
#     # 3. Add to Cart Intent
#     "add_to_cart": [
#         "add to cart",
#         "please add this item to my cart",
#         "put this in my cart",
#         "I want to add this product",
#         "add this product to my cart",
#         "could you add this to my cart"
#     ],
#     # 4. Add to Wishlist Intent
#     "add_to_wishlist": [
#         "add to wishlist",
#         "please add this to my wishlist",
#         "save this for later",
#         "put this on my wishlist",
#         "mark this as a favorite",
#         "wishlist this item"
#     ],
#     # 5. Product Description Intent
#     "product_description": [
#         "describe this product",
#         "tell me about this item",
#         "what are the details of this product",
#         "give me the specs",
#         "explain this product",
#         "what does this product do"
#     ],
#     # 6. Address Selection Intent (during checkout)
#     "address_selection": [
#         "select my address",
#         "choose this address",
#         "use this address for delivery",
#         "confirm this shipping address",
#         "pick this address",
#         "set this as my delivery address"
#     ],
#     # 7. Product Comparison Intent
#     "compare_products": [
#         # Explicit comparisons
#         "Compare <PRODUCT> and <PRODUCT>",
#         "What's the difference between <PRODUCT> and <PRODUCT>?",
#         "Show me <PRODUCT> vs <PRODUCT>",
#         "How does <PRODUCT> stack up against <PRODUCT>?",
#         "Which is better: <PRODUCT> or <PRODUCT>?",
#         "Between <PRODUCT> and <PRODUCT>, which one is better?",
#         "Which one offers more value: <PRODUCT> or <PRODUCT>?",
#         "Is <PRODUCT> better than <PRODUCT>?",
#         # Implicit comparisons
#         "Looking at <PRODUCT> and <PRODUCT> features",
#         "<PRODUCT> versus <PRODUCT> specs",
#         "Differences between these items",
#         "Which one should I choose: <PRODUCT> or <PRODUCT>?",
#         "Technical comparison of <PRODUCT> with <PRODUCT>",
#         "Compare the specs of <PRODUCT> and <PRODUCT>",
#         "Which device has better features: <PRODUCT> or <PRODUCT>?",
#         # Multi-product comparisons
#         "Compare <PRODUCT>, <PRODUCT>, and <PRODUCT>",
#         "Show all three variants side by side",
#         "Which among these is best: <PRODUCT>, <PRODUCT>, <PRODUCT>?",
#         "Compare multiple products: <PRODUCT>, <PRODUCT>, and <PRODUCT>",
#         "I need a comparison between <PRODUCT>, <PRODUCT>, and <PRODUCT>",
#         # Follow-up comparisons
#         "How about compared to <PRODUCT>?",
#         "Add <PRODUCT> to the comparison",
#         "Show me alternatives to <PRODUCT>",
#         # Price-based comparisons
#         "Which one is cheaper: <PRODUCT> or <PRODUCT>?",
#         "Compare the prices of <PRODUCT> and <PRODUCT>",
#         "Which product has better value for money: <PRODUCT> or <PRODUCT>?",
#         "Is <PRODUCT> worth the extra cost over <PRODUCT>?",
#         "Price difference between <PRODUCT> and <PRODUCT>",
#         # Feature-based comparisons
#         "Which has a better camera: <PRODUCT> or <PRODUCT>?",
#         "Compare battery life of <PRODUCT> and <PRODUCT>",
#         "Which device has better performance: <PRODUCT> or <PRODUCT>?",
#         "Which is more powerful: <PRODUCT> or <PRODUCT>?",
#         "Which one has better display quality: <PRODUCT> or <PRODUCT>?",
#         "Does <PRODUCT> have a better processor than <PRODUCT>?",
#         "Which is more durable: <PRODUCT> or <PRODUCT>?",
#         # Review-based comparisons
#         "Which one has better user reviews: <PRODUCT> or <PRODUCT>?",
#         "What do customers say about <PRODUCT> vs <PRODUCT>?",
#         "Which product has higher ratings: <PRODUCT> or <PRODUCT>?",
#         "Which is more recommended: <PRODUCT> or <PRODUCT>?",
#         # Usage-based comparisons
#         "Which is better for gaming: <PRODUCT> or <PRODUCT>?",
#         "Which is better for office work: <PRODUCT> or <PRODUCT>?",
#         "For students, which is better: <PRODUCT> or <PRODUCT>?",
#         "Which laptop is better for programming: <PRODUCT> or <PRODUCT>?",
#         "Which phone is better for photography: <PRODUCT> or <PRODUCT>?",
#         # Brand-related comparisons
#         "Is <PRODUCT> better than <PRODUCT> from <BRAND>?",
#         "How does <PRODUCT> from <BRAND> compare to <PRODUCT> from <BRAND>?",
#         "Which brand has better quality: <BRAND> or <BRAND>?",
#         # Final decision questions
#         "Help me decide between <PRODUCT> and <PRODUCT>",
#         "Which one would you recommend: <PRODUCT> or <PRODUCT>?",
#         "Should I go for <PRODUCT> or <PRODUCT>?"
#     ],
#     # 8. Order Status Intent (Track My Order)
#     "order_status": [
#         "track my order",
#         "where is my order",
#         "what is my order status",
#         "when will my order arrive",
#         "check my delivery status",
#         "what's the status of my order"
#     ],
#     # 9. Checkout Intent
#     "checkout": [
#         "checkout",
#         "place my order",
#         "proceed to checkout",
#         "I want to checkout",
#         "finish my order",
#         "complete my purchase"
#     ],
#     # 10. Technical Support Intent
#     "technical_support": [
#         "my product is not working",
#         "I need help with my device",
#         "this item is broken",
#         "I have an issue with my product",
#         "help me troubleshoot my gadget",
#         "fix my device"
#     ],
#     # 11. Price Inquiry Intent
#     "price_inquiry": [
#         "how much does this cost",
#         "what is the price",
#         "tell me the cost",
#         "is it expensive",
#         "what's the price range"
#     ],
#     # 12. View Products / Listing Intent
#     "view_products": [
#         "what products do you have?",
#         "show me your products",
#         "I want to browse your catalog",
#         "display all available products",
#         "list available gadgets"
#     ],
#     # 13. Product Pitch Intent
#     "product_pitch": [
#         "tell me more about this product",
#         "what makes this product special",
#         "explain the benefits of this item",
#         "give me more information about this",
#         "I want to know the features of this product"
#     ],
#     # 14. Checkout Help Intent
#     "checkout_help": [
#         "how do I checkout",
#         "I need help with payment",
#         "what are the payment options",
#         "guide me through checkout",
#         "I can't complete my purchase"
#     ],
#     # 15. Feedback Intent
#     "feedback": [
#         "I want to leave feedback",
#         "I want to review my experience",
#         "the service was great",
#         "I'm not satisfied",
#         "this product is amazing"
#     ],
#     # 16. Fallback / Unrecognized Intent
#     "fallback": [
#         "I don't understand"
#     ]
# }




TRAINING_DATA = [
    # 1. Greeting Intent
    # ================================
    ("hi", {"intent": "greeting"}),
    ("hey there", {"intent": "greeting"}),
    ("good morning", {"intent": "greeting"}),
    ("good afternoon", {"intent": "greeting"}),
    ("good evening", {"intent": "greeting"}),
    ("greetings", {"intent": "greeting"}),
    ("howdy", {"intent": "greeting"}),
    ("hey, how are you", {"intent": "greeting"}),
    ("hello, how can you help me", {"intent": "greeting"}),
    ("hi, what can you do", {"intent": "greeting"}),
    ("good day", {"intent": "greeting"}),
    ("hiya", {"intent": "greeting"}),
    ("morning", {"intent": "greeting"}),
    ("evening", {"intent": "greeting"}),


    # 2. Product Search Intent
    # ================================
    ("I want to buy a new phone", {"intent": "product_search"}),
    ("show me products", {"intent": "product_search"}),
    ("I'm looking for a laptop", {"intent": "product_search"}),
    ("find me some headphones", {"intent": "product_search"}),
    ("need a new tablet", {"intent": "product_search"}),
    ("search for smart devices", {"intent": "product_search"}),
    ("what products do you have", {"intent": "product_search"}),
    ("find me a gaming laptop", {"intent": "product_search"}),

    # Additional category-based examples with dynamic product names and categories
    ("I'm looking for a kitchen appliance", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "kitchen"}}),
    ("Show me living area furniture", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "living area"}}),
    ("I need a bedroom light", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "bedroom"}}),
    ("Find me a garden tool", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "garden"}}),
    ("Search for bathroom fixtures", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "bathroom"}}),
    ("I'm interested in washroom accessories", {"intent": "product_search", "entities": {"main_category": "home", "sub_category": "washroom"}}),
    ("Show office meeting room tech", {"intent": "product_search", "entities": {"main_category": "office", "sub_category": "meeting room"}}),
    ("I want smart security devices", {"intent": "product_search", "entities": {"main_category": "office", "sub_category": "security"}}),
    ("Find research lab equipment", {"intent": "product_search", "entities": {"main_category": "office", "sub_category": "research lab"}}),
    ("Show me office gadgets", {"intent": "product_search", "entities": {"main_category": "office"}}),  # 3. Add to Cart Intent
   
   
    # ================================
    ("add to cart", {"intent": "add_to_cart"}),
    ("please add this item to my cart", {"intent": "add_to_cart"}),
    ("put this in my cart", {"intent": "add_to_cart"}),
    ("I want to add this product", {"intent": "add_to_cart"}),
    ("add this product to my cart", {"intent": "add_to_cart"}),
    ("could you add this to my cart", {"intent": "add_to_cart"}),

    # Dynamic product adding
    ("add {product} to my cart", {"intent": "add_to_cart", "entities": {"product": "<PRODUCT>"}}),
    ("please add {product} to my cart", {"intent": "add_to_cart", "entities": {"product": "<PRODUCT>"}}),
    ("I want to add {product} to my cart", {"intent": "add_to_cart", "entities": {"product": "<PRODUCT>"}}),
    ("put {product} in my cart", {"intent": "add_to_cart", "entities": {"product": "<PRODUCT>"}}),
     
     # 4. Add to Wishlist Intent
    # ================================
    ("add to wishlist", {"intent": "add_to_wishlist"}),
    ("please add this to my wishlist", {"intent": "add_to_wishlist"}),
    ("save this for later", {"intent": "add_to_wishlist"}),
    ("put this on my wishlist", {"intent": "add_to_wishlist"}),
    ("mark this as a favorite", {"intent": "add_to_wishlist"}),
    ("wishlist this item", {"intent": "add_to_wishlist"}),

    # 5. Product Description Intent
    # ================================
    ("describe this product", {"intent": "product_description"}),
    ("tell me about this item", {"intent": "product_description"}),
    ("what are the details of this product", {"intent": "product_description"}),
    ("give me the specs", {"intent": "product_description"}),
    ("explain this product", {"intent": "product_description"}),
    ("what does this product do", {"intent": "product_description"}),

    # 6. Address Selection Intent
    # ================================
    ("select my address", {"intent": "address_selection"}),
    ("choose this address", {"intent": "address_selection"}),
    ("use this address for delivery", {"intent": "address_selection"}),
    ("confirm this shipping address", {"intent": "address_selection"}),
    ("pick this address", {"intent": "address_selection"}),
    ("set this as my delivery address", {"intent": "address_selection"}),

    # 7. Order Status Intent
    # ================================
    ("track my order", {"intent": "order_status"}),
    ("where is my order", {"intent": "order_status"}),
    ("what is my order status", {"intent": "order_status"}),
    ("when will my order arrive", {"intent": "order_status"}),
    ("check my delivery status", {"intent": "order_status"}),
    ("what's the status of my order", {"intent": "order_status"}),

    # 8. Checkout Intent
    # ================================
    ("checkout", {"intent": "checkout"}),
    ("place my order", {"intent": "checkout"}),
    ("proceed to checkout", {"intent": "checkout"}),
    ("I want to checkout", {"intent": "checkout"}),
    ("finish my order", {"intent": "checkout"}),
    ("complete my purchase", {"intent": "checkout"}),

    # 9. Technical Support Intent
    # ================================
    ("my product is not working", {"intent": "technical_support"}),
    ("I need help with my device", {"intent": "technical_support"}),
    ("this item is broken", {"intent": "technical_support"}),
    ("I have an issue with my product", {"intent": "technical_support"}),
    ("help me troubleshoot my gadget", {"intent": "technical_support"}),
    ("fix my device", {"intent": "technical_support"}),

    # 10. Price Inquiry Intent
    # ================================
    ("how much does this cost", {"intent": "price_inquiry"}),
    ("what is the price", {"intent": "price_inquiry"}),
    ("tell me the cost", {"intent": "price_inquiry"}),
    ("is it expensive", {"intent": "price_inquiry"}),
    ("what's the price range", {"intent": "price_inquiry"}),

    # 11. View Products / Listing Intent
    # ================================
    ("what products do you have?", {"intent": "view_products"}),
    ("show me your products", {"intent": "view_products"}),
    ("I want to browse your catalog", {"intent": "view_products"}),
    ("display all available products", {"intent": "view_products"}),
    ("list available gadgets", {"intent": "view_products"}),

    # 12. Product Pitch Intent
    # ================================
    ("tell me more about this product", {"intent": "product_pitch"}),
    ("what makes this product special", {"intent": "product_pitch"}),
    ("explain the benefits of this item", {"intent": "product_pitch"}),
    ("give me more information about this", {"intent": "product_pitch"}),
    ("I want to know the features of this product", {"intent": "product_pitch"}),

    # 13. Checkout Help Intent
    # ================================
    ("how do I checkout", {"intent": "checkout_help"}),
    ("I need help with payment", {"intent": "checkout_help"}),
    ("what are the payment options", {"intent": "checkout_help"}),
    ("guide me through checkout", {"intent": "checkout_help"}),
    ("I can't complete my purchase", {"intent": "checkout_help"}),

    # 14. Feedback Intent
    # ================================
    ("I want to leave feedback", {"intent": "feedback"}),
    ("I want to review my experience", {"intent": "feedback"}),
    ("the service was great", {"intent": "feedback"}),
    ("I'm not satisfied", {"intent": "feedback"}),
    ("this product is amazing", {"intent": "feedback"}),


    #product comparission
    ("Compare iPhone 15 and Samsung S24", {"intent": "product_comparison"}),
    ("What's the difference between MacBook Pro and Dell XPS?", {"intent": "product_comparison"}),
    ("Show all three variants side by side", {"intent": "product_comparison"}),
    ("Add Google Pixel to the comparison", {"intent": "product_comparison"}),
    ("Compare Apple Watch and Samsung Galaxy Watch", {"intent": "product_comparison"}),
    ("Tell me which is better: iPad or Surface Pro", {"intent": "product_comparison"}),
     ("Compare {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("What's the difference between {product1} and {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Show me {product1} vs {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("How does {product1} stack up against {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which is better: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Between {product1} and {product2}, which one is better?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which one offers more value: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Is {product1} better than {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    
    # Implicit comparisons
    ("Looking at {product1} and {product2} features", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("{product1} versus {product2} specs", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Differences between these items", {"intent": "compare_products"}),
    ("Which one should I choose: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Technical comparison of {product1} with {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Compare the specs of {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),

    # Multi-product comparisons
    ("Compare {product1}, {product2}, and {product3}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "product3": "<PRODUCT>"}}),
    ("Show all three variants side by side", {"intent": "compare_products"}),
    ("Which among these is best: {product1}, {product2}, {product3}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "product3": "<PRODUCT>"}}),
    ("Compare multiple products: {product1}, {product2}, and {product3}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "product3": "<PRODUCT>"}}),
    ("I need a comparison between {product1}, {product2}, and {product3}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "product3": "<PRODUCT>"}}),

    # Follow-up comparisons
    ("How about compared to {product1}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>"}}),
    ("Add {product1} to the comparison", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>"}}),
    ("Show me alternatives to {product1}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>"}}),

    # Price-based comparisons
    ("Which one is cheaper: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Compare the prices of {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which product has better value for money: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Is {product1} worth the extra cost over {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Price difference between {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),

    # Feature-based comparisons
    ("Which has a better camera: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Compare battery life of {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which device has better performance: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which is more powerful: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which one has better display quality: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),

    # Review-based comparisons
    ("Which one has better user reviews: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("What do customers say about {product1} vs {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which product has higher ratings: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),

    # Brand-related comparisons
    ("Is {product1} better than {product2} from {brand1}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "brand1": "<BRAND>"}}),
    ("How does {product1} from {brand1} compare to {product2} from {brand2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>", "brand1": "<BRAND>", "brand2": "<BRAND>"}}),
    ("Which brand has better quality: {brand1} or {brand2}?", {"intent": "compare_products", "entities": {"brand1": "<BRAND>", "brand2": "<BRAND>"}}),

    # Decision-making
    ("Help me decide between {product1} and {product2}", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Which one would you recommend: {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),
    ("Should I go for {product1} or {product2}?", {"intent": "compare_products", "entities": {"product1": "<PRODUCT>", "product2": "<PRODUCT>"}}),

    # 15. Fallback / Unrecognized Intent
    # ================================
    ("I don't understand", {"intent": "fallback"}),
]
