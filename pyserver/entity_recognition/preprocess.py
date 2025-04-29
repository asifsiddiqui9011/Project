import re

# Dictionary for common misspellings or variations used by customers
COMMON_MISSPELLINGS = {
    "kart": "cart",
    "carr": "cart",
    # Add more corrections as needed, for example:
    "prduct": "product",
    "wiew": "view",
    "shw": "show",
    "ofr": "offer",
    "recieve": "receive",
    # etc.
}

def clean_text(text: str) -> str:
    """
    Converts text to lowercase, removes special characters and digits,
    normalizes whitespace, and corrects common misspellings.
    """
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)    # Remove special characters   
    text = re.sub(r'\s+', ' ', text).strip()  # Normalize whitespace

    # Correct common misspellings based on our domain-specific dictionary.
    words = text.split()
    corrected_words = [COMMON_MISSPELLINGS.get(word, word) for word in words]
    return " ".join(corrected_words)

# Example usage:
input_text = "please shw me my kart"
print(clean_text(input_text))
# Output: "please show me my cart"


def tokenize_text(text: str) -> list:
    """
    Splits the text into tokens (words).
    """
    return text.split()
