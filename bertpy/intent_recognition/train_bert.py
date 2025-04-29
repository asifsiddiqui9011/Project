# from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
# from datasets import load_dataset
# import torch

# # Load dataset
# dataset = load_dataset('json', data_files='./ai-server/nlp/intents.json')

# # Preprocess data
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# def tokenize_function(examples):
#     return tokenizer(
#         examples["patterns"], 
#         padding="max_length", 
#         truncation=True, 
#         max_length=128
#     )

# tokenized_dataset = dataset.map(tokenize_function, batched=True)
# tokenized_dataset = tokenized_dataset.rename_column("tag", "label")

# # Convert to PyTorch format
# train_dataset = tokenized_dataset['train'].to_torch_format()

# # Initialize model
# model = BertForSequenceClassification.from_pretrained(
#     'bert-base-uncased',
#     num_labels=len(set(dataset['train']['label']))
# )

# # Training arguments
# training_args = TrainingArguments(
#     output_dir='./results',
#     num_train_epochs=3,
#     per_device_train_batch_size=16,
#     evaluation_strategy="epoch",
#     logging_dir='./logs',
# )

# # Train
# trainer = Trainer(
#     model=model,
#     args=training_args,
#     train_dataset=train_dataset,
# )

# trainer.train()
# model.save_pretrained('./ai-server/models/bert_model')
# tokenizer.save_pretrained('./ai-server/models/bert_model')


from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset, Dataset
import torch
import json
import numpy as np

# Load and preprocess dataset
def load_intents(file_path):
    with open(file_path) as f:
        data = json.load(f)
    
    texts = []
    labels = []
    label_map = {}
    
    # Create label mapping
    for idx, intent in enumerate(data['intents']):
        label_map[intent['tag']] = idx
    
    # Generate samples
    for intent in data['intents']:
        for pattern in intent['patterns']:
            texts.append(pattern)
            labels.append(label_map[intent['tag']])
    
    return Dataset.from_dict({'text': texts, 'label': labels}), label_map

# Load dataset
dataset, label_map = load_intents('nlp/intents.json')
dataset = dataset.train_test_split(test_size=0.2)

# Initialize tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Tokenization function
def tokenize_function(examples):
    return tokenizer(
        examples['text'],
        padding='max_length',
        truncation=True,
        max_length=128,
        return_tensors='np'
    )

# Tokenize dataset
tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Convert to PyTorch format
tokenized_dataset.set_format(
    'torch',
    columns=['input_ids', 'attention_mask', 'label']
)

# Model definition
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=len(label_map),
    id2label={v: k for k, v in label_map.items()},
    label2id=label_map
)

# Training configuration
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=4,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True
)

# Create Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset['train'],
    eval_dataset=tokenized_dataset['test'],
)

# Train and save
trainer.train()
model.save_pretrained('models/bert_model')
tokenizer.save_pretrained('models/bert_model')

# Save label map
with open('models/bert_model/label_map.json', 'w') as f:
    json.dump(label_map, f)