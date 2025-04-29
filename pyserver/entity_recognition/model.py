
# import numpy as np
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Preprocessing: Extract texts and intents
# # ------------------------------
# def preprocess_training_data(data):
#     texts, intents = [], []
#     for text, labels in data:
#         texts.append(text)
#         intents.append(labels["intent"])
#     return texts, intents

# texts, intents = preprocess_training_data(TRAINING_DATA)

# # ------------------------------
# # Tokenizer setup
# # ------------------------------
# tokenizer = Tokenizer()
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1
# sequences = tokenizer.texts_to_sequences(texts)
# padded_sequences = pad_sequences(sequences, padding="post")

# # ------------------------------
# # Intent mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {v: k for k, v in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load pretrained GloVe embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # For glove.6B.50d.txt
# glove_file = "glove.6B.50d.txt"  # Update this path as needed
# embeddings_index = load_glove_embeddings(glove_file)

# # Create an embedding matrix using our tokenizer's word index
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the RNN model with pretrained embeddings
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, lstm_units=32, dropout_rate=0.2):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=padded_sequences.shape[1],
#             weights=[embedding_matrix],
#             trainable=False  # Freeze embeddings; set to True to fine-tune
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# model = build_model_with_pretrained(vocab_size, embedding_dim)
# model.fit(padded_sequences, intent_labels, epochs=200, verbose=1)
# model.save("intent_model.h5")

# # ------------------------------
# # Predict intent using the trained model
# # ------------------------------
# def predict_intent(text):
#     sequence = tokenizer.texts_to_sequences([text])
#     padded_sequence = pad_sequences(sequence, maxlen=padded_sequences.shape[1])
#     prediction = model.predict(padded_sequence, verbose=0)
#     intent = reverse_intent_map[np.argmax(prediction)]
#     return intent




# import numpy as np
# import re
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Function to Replace Placeholders in Training Data
# # ------------------------------
# def preprocess_text(text):
#     """
#     Replaces product placeholders like {product1}, {product2}, {product3} 
#     with a generic token <PRODUCT>.
#     """
#     return re.sub(r"\{product\d+\}", "<PRODUCT>", text)

# # ------------------------------
# # Preprocess Training Data
# # ------------------------------
# texts, intents = [], []
# for text, labels in TRAINING_DATA:
#     processed_text = preprocess_text(text)  # Replace placeholders
#     texts.append(processed_text)
#     intents.append(labels["intent"])

# # ------------------------------
# # Tokenizer Setup
# # ------------------------------
# tokenizer = Tokenizer(oov_token="<OOV>")  # Handle unknown words
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1
# sequences = tokenizer.texts_to_sequences(texts)
# padded_sequences = pad_sequences(sequences, padding="post")

# # ------------------------------
# # Intent Mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {v: k for k, v in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load Pretrained GloVe Embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # Using glove.6B.50d.txt
# glove_file = "glove.6B.50d.txt"  # Ensure the correct path
# embeddings_index = load_glove_embeddings(glove_file)

# # Create an embedding matrix
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the RNN Model with Pretrained Embeddings
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, lstm_units=32, dropout_rate=0.2):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=padded_sequences.shape[1],
#             weights=[embedding_matrix],
#             trainable=False  # Freeze embeddings to prevent unintended changes
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# model = build_model_with_pretrained(vocab_size, embedding_dim)
# model.fit(padded_sequences, intent_labels, epochs=200, verbose=1)
# model.save("intent_model.h5")

# # ------------------------------
# # Predict Intent Using the Trained Model
# # ------------------------------
# def predict_intent(text):
#     """
#     Predicts the intent of the given text after preprocessing.
#     """
#     processed_text = preprocess_text(text)  # Replace product names with <PRODUCT>
#     sequence = tokenizer.texts_to_sequences([processed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=padded_sequences.shape[1])
#     prediction = model.predict(padded_sequence, verbose=0)
#     intent = reverse_intent_map[np.argmax(prediction)]
#     return intent

# # ------------------------------
# # Example Predictions
# # ------------------------------
# test_sentences = [
#     "Compare iPhone 15 and Samsung S24",
#     "What’s the difference between MacBook Pro and Dell XPS?",
#     "Show all three variants side by side",
#     "Add Google Pixel to the comparison"
# ]

# for sentence in test_sentences:
#     print(f"Input: {sentence}")
#     print(f"Predicted Intent: {predict_intent(sentence)}")
#     print("-" * 50)


# import numpy as np
# import re
# import os
# import tensorflow as tf
# from tensorflow.keras.models import Sequential, load_model
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.callbacks import EarlyStopping
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Function to Replace Placeholders in Training Data
# # ------------------------------
# def preprocess_text(text):
#     """
#     Replaces product placeholders like {product1}, {product2}, etc. with a generic token <PRODUCT>,
#     converts text to lowercase and strips whitespace.
#     """
#     text = text.lower().strip()
#     # Replace placeholders if they exist. (If using <PRODUCT> directly in the training data, this may be redundant.)
#     text = re.sub(r"\{product\d+\}", "<PRODUCT>", text)
#     return text

# # ------------------------------
# # Preprocess Training Data
# # ------------------------------
# def dict_to_training_pairs(training_dict):
#     pairs = []
#     for intent, phrases in training_dict.items():
#         for phrase in phrases:
#             pairs.append((phrase, intent))
#     return pairs

# # Convert training data if provided as dict; otherwise assume list-of-tuples.
# if isinstance(TRAINING_DATA, dict):
#     training_pairs = dict_to_training_pairs(TRAINING_DATA)
# else:
#     training_pairs = TRAINING_DATA

# texts, intents = [], []
# for text, intent_label in training_pairs:
#     processed_text = preprocess_text(text)
#     texts.append(processed_text)
#     intents.append(intent_label)

# # ------------------------------
# # Tokenizer Setup
# # ------------------------------
# tokenizer = Tokenizer(oov_token="<OOV>")
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1  # +1 for OOV token
# sequences = tokenizer.texts_to_sequences(texts)
# max_sequence_length = max(len(seq) for seq in sequences)
# padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding="post")

# # ------------------------------
# # Intent Mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {v: k for k, v in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load Pretrained GloVe Embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # Using glove.6B.50d.txt
# glove_file = "glove.6B.50d.txt"  # Ensure this path is correct
# embeddings_index = load_glove_embeddings(glove_file)

# # Create an embedding matrix
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the RNN Model with Pretrained Embeddings
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, max_seq_len, lstm_units=64, dropout_rate=0.3):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=max_seq_len,
#             weights=[embedding_matrix],
#             trainable=False  # Freeze embeddings
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# MODEL_PATH = "intent_model.h5"

# if os.path.exists(MODEL_PATH):
#     print("[INFO] Loading existing model...")
#     model = load_model(MODEL_PATH)
# else:
#     print("[INFO] Training new model...")
#     model = build_model_with_pretrained(vocab_size, embedding_dim, max_sequence_length)
#     early_stopping = EarlyStopping(monitor="loss", patience=5, restore_best_weights=True)
#     model.fit(padded_sequences, intent_labels, epochs=100, verbose=1, callbacks=[early_stopping])
#     model.save(MODEL_PATH)

# # ------------------------------
# # Predict Intent Using the Trained Model
# # ------------------------------
# def predict_intent(text):
#     """
#     Predicts the intent of the given text after preprocessing.
#     """
#     processed_text = preprocess_text(text)
#     sequence = tokenizer.texts_to_sequences([processed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)
#     prediction = model.predict(padded_sequence, verbose=0)
#     predicted_index = np.argmax(prediction)
#     # Use get() with fallback to avoid KeyError
#     intent = reverse_intent_map.get(predicted_index, "fallback")
#     return intent

# # ------------------------------
# # Example Predictions
# # ------------------------------
# test_sentences = [
#     "Compare iPhone 15 and Samsung S24",
#     "What's the difference between MacBook Pro and Dell XPS?",
#     "Show all three variants side by side",
#     "Add Google Pixel to the comparison",
#     "hello",
#     "checkout"
# ]

# for sentence in test_sentences:
#     print(f"Input: {sentence}")
#     print(f"Predicted Intent: {predict_intent(sentence)}")
#     print("-" * 50)


# import numpy as np
# import re
# import os
# import tensorflow as tf
# from tensorflow.keras.models import Sequential, load_model
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.callbacks import EarlyStopping
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Function to Replace Placeholders in Training Data
# # ------------------------------

# # Utility function to convert a dictionary training data to list-of-tuples
# def dict_to_training_pairs(training_dict):
#     pairs = []
#     for intent, phrases in training_dict.items():
#         for phrase in phrases:
#             pairs.append((phrase, intent))
#     return pairs

# # Check if TRAINING_DATA is a dict and convert it accordingly.
# if isinstance(TRAINING_DATA, dict):
#     training_pairs = dict_to_training_pairs(TRAINING_DATA)
# else:
#     training_pairs = TRAINING_DATA

# def preprocess_text(text):
#     """
#     Replaces product placeholders like {product1}, {product2}, etc. with <PRODUCT>.
#     Also converts text to lowercase and strips whitespace.
#     """
#     text = text.lower().strip()
#     text = re.sub(r"\{product\d+\}", "<PRODUCT>", text)
#     return text

# # ------------------------------
# # Convert Training Data (if given as list of tuples)
# # ------------------------------
# texts, intents = [], []
# for text, labels in TRAINING_DATA:
#     processed_text = preprocess_text(text)
#     texts.append(processed_text)
#     intents.append(labels["intent"])

# # ------------------------------
# # Tokenizer Setup
# # ------------------------------
# tokenizer = Tokenizer(oov_token="<OOV>")
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1
# sequences = tokenizer.texts_to_sequences(texts)
# max_sequence_length = max(len(seq) for seq in sequences)
# padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding="post")

# # ------------------------------
# # Intent Mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {v: k for k, v in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load Pretrained GloVe Embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # Using glove.6B.50d.txt
# glove_file = "glove.6B.50d.txt"  # Update this path as needed
# embeddings_index = load_glove_embeddings(glove_file)

# # Create an embedding matrix
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the RNN Model with Pretrained Embeddings
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, max_seq_len, lstm_units=64, dropout_rate=0.3):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=max_seq_len,
#             weights=[embedding_matrix],
#             trainable=False
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# MODEL_PATH = "intent_model.h5"
# if os.path.exists(MODEL_PATH):
#     print("[INFO] Loading existing model...")
#     model = load_model(MODEL_PATH)
# else:
#     print("[INFO] Training new model...")
#     model = build_model_with_pretrained(vocab_size, embedding_dim, max_sequence_length)
#     early_stopping = EarlyStopping(monitor="loss", patience=5, restore_best_weights=True)
#     model.fit(padded_sequences, intent_labels, epochs=100, verbose=1, callbacks=[early_stopping])
#     model.save(MODEL_PATH)

# # ------------------------------
# # Predict Intent Using the Trained Model
# # ------------------------------
# def predict_intent(text):
#     """
#     Predicts the intent of the given text after preprocessing.
#     """
#     processed_text = preprocess_text(text)
#     sequence = tokenizer.texts_to_sequences([processed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)
#     prediction = model.predict(padded_sequence, verbose=0)
#     predicted_index = np.argmax(prediction)
#     intent = reverse_intent_map.get(predicted_index, "fallback")
#     return intent

# # ------------------------------
# # Example Predictions
# # ------------------------------
# test_sentences = [
#     "Compare iPhone 15 and Samsung S24",
#     "What's the difference between MacBook Pro and Dell XPS?",
#     "Show all three variants side by side",
#     "Add Google Pixel to the comparison"
# ]

# for sentence in test_sentences:
#     print(f"Input: {sentence}")
#     print(f"Predicted Intent: {predict_intent(sentence)}")
#     print("-" * 50)



# import numpy as np
# import re
# import os
# import tensorflow as tf
# from tensorflow.keras.models import Sequential, load_model
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.callbacks import EarlyStopping
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Utility: Convert dictionary training data to list-of-tuples
# # ------------------------------
# # def dict_to_training_pairs(training_dict):
# #     pairs = []
# #     for intent, phrases in training_dict.items():
# #         for phrase in phrases:
# #             pairs.append((phrase, intent))
# #     return pairs

# # # ------------------------------
# # # Determine training pairs from TRAINING_DATA
# # # ------------------------------
# # if isinstance(TRAINING_DATA, dict):
# #     training_pairs = dict_to_training_pairs(TRAINING_DATA)
# # else:
# #     training_pairs = TRAINING_DATA

# # ------------------------------
# # Function to Replace Placeholders and Preprocess Text
# # ------------------------------
# def preprocess_text(text):
#     """
#     Replaces product placeholders like {product1}, {product2}, etc. with <PRODUCT>,
#     converts text to lowercase, and strips whitespace.
#     """
#     text = text.lower().strip()
#     text = re.sub(r"\{product\d+\}", "<PRODUCT>", text)
#     return text

# # ------------------------------
# # Preprocess Training Data: Build texts and intents lists from training_pairs
# # ------------------------------
# texts, intents = [], []
# for text, intent_label in TRAINING_DATA:
#     processed_text = preprocess_text(text)
#     texts.append(processed_text)
#     intents.append(intent_label)

# # ------------------------------
# # Tokenizer Setup
# # ------------------------------
# tokenizer = Tokenizer(oov_token="<OOV>")
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1  # +1 for <OOV>
# sequences = tokenizer.texts_to_sequences(texts)
# max_sequence_length = max(len(seq) for seq in sequences)
# padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding="post")

# # ------------------------------
# # Intent Mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {v: k for k, v in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load Pretrained GloVe Embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # Using glove.6B.50d.txt
# glove_file = "glove.6B.50d.txt"  # Ensure this path is correct
# embeddings_index = load_glove_embeddings(glove_file)

# # Create an embedding matrix
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the RNN Model with Pretrained Embeddings
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, max_seq_len, lstm_units=64, dropout_rate=0.3):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=max_seq_len,
#             weights=[embedding_matrix],
#             trainable=False  # Freeze embeddings
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# MODEL_PATH = "intent_model.h5"
# if os.path.exists(MODEL_PATH):
#     print("[INFO] Loading existing model...")
#     model = load_model(MODEL_PATH)
# else:
#     print("[INFO] Training new model...")
#     model = build_model_with_pretrained(vocab_size, embedding_dim, max_sequence_length)
#     early_stopping = EarlyStopping(monitor="loss", patience=5, restore_best_weights=True)
#     model.fit(padded_sequences, intent_labels, epochs=100, verbose=1, callbacks=[early_stopping])
#     model.save(MODEL_PATH)

# # ------------------------------
# # Predict Intent Using the Trained Model
# # ------------------------------
# def predict_intent(text):
#     """
#     Predicts the intent of the given text after preprocessing.
#     """
#     processed_text = preprocess_text(text)
#     sequence = tokenizer.texts_to_sequences([processed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)
#     prediction = model.predict(padded_sequence, verbose=0)
#     predicted_index = np.argmax(prediction)
#     intent = reverse_intent_map.get(predicted_index, "fallback")
#     return intent

# # ------------------------------
# # Example Predictions
# # ------------------------------
# test_sentences = [
#     "Compare iPhone 15 and Samsung S24",
#     "What's the difference between MacBook Pro and Dell XPS?",
#     "Show all three variants side by side",
#     "Add Google Pixel to the comparison",
#     "Add iPhone 15 to my cart"
# ]

# for sentence in test_sentences:
#     print(f"Input: {sentence}")
#     print(f"Predicted Intent: {predict_intent(sentence)}")
#     print("-" * 50)





# import numpy as np
# import re
# import os
# import tensorflow as tf
# from tensorflow.keras.models import Sequential, load_model
# from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.callbacks import EarlyStopping
# from entity_recognition.training_data import TRAINING_DATA

# # ------------------------------
# # Preprocess Text Function
# # ------------------------------
# def preprocess_text(text):
#     """
#     Converts text to lowercase, removes placeholders, and strips whitespace.
#     """
#     text = text.lower().strip()
#     text = re.sub(r"\{product\d+\}", "<PRODUCT>", text)  # Generalizing product mentions
#     return text

# # ------------------------------
# # Prepare Training Data
# # ------------------------------
# texts, intents = [], []
# for text, intent_dict in TRAINING_DATA:
#     processed_text = preprocess_text(text)
#     texts.append(processed_text)
#     intents.append(intent_dict["intent"])

# # ------------------------------
# # Tokenizer Setup
# # ------------------------------
# tokenizer = Tokenizer(oov_token="<OOV>")
# tokenizer.fit_on_texts(texts)
# vocab_size = len(tokenizer.word_index) + 1  # +1 for OOV token
# sequences = tokenizer.texts_to_sequences(texts)
# max_sequence_length = max(len(seq) for seq in sequences)
# padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding="post")

# # ------------------------------
# # Intent Mapping
# # ------------------------------
# intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
# reverse_intent_map = {idx: intent for intent, idx in intent_map.items()}
# intent_labels = np.array([intent_map[intent] for intent in intents])

# # ------------------------------
# # Load Pretrained GloVe Embeddings
# # ------------------------------
# def load_glove_embeddings(glove_file_path):
#     embeddings_index = {}
    
#     if not os.path.exists(glove_file_path):
#         print(f"[ERROR] GloVe file '{glove_file_path}' not found! Skipping embedding initialization.")
#         return embeddings_index

#     with open(glove_file_path, encoding="utf8") as f:
#         for line in f:
#             values = line.split()
#             word = values[0]
#             vector = np.asarray(values[1:], dtype="float32")
#             embeddings_index[word] = vector
#     return embeddings_index

# embedding_dim = 50  # Using glove.6B.50d.txt (50-dimensional vectors)
# glove_file = "glove.6B.50d.txt"  # Ensure this file exists
# embeddings_index = load_glove_embeddings(glove_file)

# # ------------------------------
# # Create an Embedding Matrix
# # ------------------------------
# embedding_matrix = np.zeros((vocab_size, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     embedding_vector = embeddings_index.get(word)
#     if embedding_vector is not None:
#         embedding_matrix[i] = embedding_vector

# # ------------------------------
# # Build the LSTM Model
# # ------------------------------
# def build_model_with_pretrained(vocab_size, embedding_dim, max_seq_len, lstm_units=64, dropout_rate=0.3):
#     model = Sequential([
#         Embedding(
#             input_dim=vocab_size,
#             output_dim=embedding_dim,
#             input_length=max_seq_len,
#             weights=[embedding_matrix] if embeddings_index else None,  # Use GloVe if available
#             trainable=False if embeddings_index else True
#         ),
#         LSTM(lstm_units, return_sequences=False),
#         Dropout(dropout_rate),
#         Dense(len(intent_map), activation="softmax"),
#     ])
#     model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#     return model

# # ------------------------------
# # Load or Train the Model
# # ------------------------------
# MODEL_PATH = "intent_model.h5"

# def load_or_train_model():
#     """
#     Loads an existing model or trains a new one if the model file is missing or corrupt.
#     """
#     if os.path.exists(MODEL_PATH):
#         try:
#             print("[INFO] Loading existing model...")
#             return load_model(MODEL_PATH)
#         except Exception as e:
#             print(f"[WARNING] Failed to load model due to error: {e}. Retraining...")

#     print("[INFO] Training new model...")
#     model = build_model_with_pretrained(vocab_size, embedding_dim, max_sequence_length)
#     early_stopping = EarlyStopping(monitor="loss", patience=5, restore_best_weights=True)
#     model.fit(padded_sequences, intent_labels, epochs=100, verbose=1, callbacks=[early_stopping])
#     model.save(MODEL_PATH)
#     return model

# model = load_or_train_model()

# # ------------------------------
# # Predict Intent Function
# # ------------------------------
# def predict_intent(text):
#     """
#     Predicts the intent of the given text after preprocessing.
#     """
#     processed_text = preprocess_text(text)
#     sequence = tokenizer.texts_to_sequences([processed_text])
#     padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)
#     prediction = model.predict(padded_sequence, verbose=0)
#     predicted_index = np.argmax(prediction)
#     return reverse_intent_map.get(predicted_index, "fallback")

# # ------------------------------
# # Example Predictions
# # ------------------------------
# test_sentences = [
#     "Compare iPhone 15 and Samsung S24",
#     "What's the difference between MacBook Pro and Dell XPS?",
#     "Show all three variants side by side",
#     "Add Google Pixel to the comparison",
#     "Add iPhone 15 to my cart"
# ]

# for sentence in test_sentences:
#     print(f"Input: {sentence}")
#     print(f"Predicted Intent: {predict_intent(sentence)}")
#     print("-" * 50)




import numpy as np
import re
import os
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.callbacks import EarlyStopping
from entity_recognition.training_data import TRAINING_DATA

# ------------------------------
# Preprocess Text Function
# ------------------------------
def preprocess_text(text):
    """
    Converts text to lowercase, strips whitespace, and replaces product placeholders.
    """
    text = text.lower().strip()
    text = re.sub(r"\{product\d+\}", "<PRODUCT>", text)  # Generalizing product mentions
    return text

# ------------------------------
# Prepare Training Data
# ------------------------------
texts, intents = [], []
for text, intent_dict in TRAINING_DATA:
    processed_text = preprocess_text(text)
    texts.append(processed_text)
    intents.append(intent_dict["intent"])

# ------------------------------
# Tokenizer Setup
# ------------------------------
tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(texts)
vocab_size = len(tokenizer.word_index) + 1  # +1 for the OOV token
sequences = tokenizer.texts_to_sequences(texts)
max_sequence_length = max(len(seq) for seq in sequences)
padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length, padding="post")

# ------------------------------
# Intent Mapping
# ------------------------------
intent_map = {intent: idx for idx, intent in enumerate(set(intents))}
reverse_intent_map = {idx: intent for intent, idx in intent_map.items()}
intent_labels = np.array([intent_map[intent] for intent in intents])

# ------------------------------
# Load Pretrained GloVe Embeddings
# ------------------------------
def load_glove_embeddings(glove_file_path):
    embeddings_index = {}
    if not os.path.exists(glove_file_path):
        print(f"[ERROR] GloVe file '{glove_file_path}' not found! Skipping embedding initialization.")
        return embeddings_index
    with open(glove_file_path, encoding="utf8") as f:
        for line in f:
            values = line.split()
            word = values[0]
            vector = np.asarray(values[1:], dtype="float32")
            embeddings_index[word] = vector
    return embeddings_index

embedding_dim = 50  # Using glove.6B.50d.txt with 50-dimensional vectors
glove_file = "glove.6B.50d.txt"  # Ensure this file exists in your working directory
embeddings_index = load_glove_embeddings(glove_file)

# Create an embedding matrix
embedding_matrix = np.zeros((vocab_size, embedding_dim))
for word, i in tokenizer.word_index.items():
    embedding_vector = embeddings_index.get(word)
    if embedding_vector is not None:
        embedding_matrix[i] = embedding_vector

# ------------------------------
# Build the LSTM Model with Pretrained Embeddings
# ------------------------------
def build_model_with_pretrained(vocab_size, embedding_dim, max_seq_len, lstm_units=64, dropout_rate=0.5):
    model = Sequential([
        Embedding(
            input_dim=vocab_size,
            output_dim=embedding_dim,
            input_length=max_seq_len,
            weights=[embedding_matrix] if embeddings_index else None,
            trainable=False if embeddings_index else True
        ),
        LSTM(lstm_units, return_sequences=False),
        Dropout(dropout_rate),
        Dense(len(intent_map), activation="softmax"),
    ])
    model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
    return model

# ------------------------------
# Load or Train the Model
# ------------------------------
MODEL_PATH = "intent_model.h5"

def load_or_train_model():
    """
    Loads an existing model from MODEL_PATH, or trains a new model if not available.
    """
    if os.path.exists(MODEL_PATH):
        try:
            print("[INFO] Loading existing model...")
            return load_model(MODEL_PATH)
        except Exception as e:
            print(f"[WARNING] Failed to load model: {e}. Retraining...")
    print("[INFO] Training new model...")
    model = build_model_with_pretrained(vocab_size, embedding_dim, max_sequence_length)
    early_stopping = EarlyStopping(monitor="loss", patience=5, restore_best_weights=True)
    model.fit(padded_sequences, intent_labels, epochs=200, verbose=1, callbacks=[early_stopping])
    model.save(MODEL_PATH)
    return model

model = load_or_train_model()

# ------------------------------
# Predict Intent Function
# ------------------------------
def predict_intent(text):
    """
    Predicts the intent of the given text after preprocessing.
    """
    processed_text = preprocess_text(text)
    sequence = tokenizer.texts_to_sequences([processed_text])
    padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)
    prediction = model.predict(padded_sequence, verbose=0)
    predicted_index = np.argmax(prediction)
    return reverse_intent_map.get(predicted_index, "fallback")

# ------------------------------
# Example Predictions
# ------------------------------
test_sentences = [
    "Compare iPhone 15 and Samsung S24",
    "What's the difference between MacBook Pro and Dell XPS?",
    "Show all three variants side by side",
    "Add Google Pixel to the comparison",
    "Add iPhone 15 to my cart"
]

for sentence in test_sentences:
    print(f"Input: {sentence}")
    print(f"Predicted Intent: {predict_intent(sentence)}")
    print("-" * 50)
