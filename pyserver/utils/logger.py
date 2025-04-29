import logging

# Configure logging
logging.basicConfig(
    filename="logs/app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

def log_request(text):
    logging.info(f"Received text: {text}")

def log_error(error):
    logging.error(f"Error: {error}")
