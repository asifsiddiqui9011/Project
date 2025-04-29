import torch
from transformers import BertTokenizer, BertForSequenceClassification
from typing import Dict, Any

class BERTIntentClassifier:
    def __init__(self, model_path: str):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = BertForSequenceClassification.from_pretrained(model_path).to(self.device)
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model.eval()
        
        # Load label map
        with open(f'{model_path}/label_map.json') as f:
            self.label_map = json.load(f)
            self.id2label = {v: k for k, v in self.label_map.items()}

    def predict(self, text: str) -> Dict[str, Any]:
        inputs = self.tokenizer(
            text,
            return_tensors='pt',
            padding=True,
            truncation=True,
            max_length=128
        ).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
        confidence, pred_id = torch.max(probs, dim=-1)
        
        return {
            'intent': self.id2label[pred_id.item()],
            'confidence': confidence.item(),
            'details': {
                'text': text,
                'model': 'bert-base-uncased',
                'labels': self.id2label
            }
        }

# Usage example
if __name__ == '__main__':
    classifier = BERTIntentClassifier('models/bert_model')
    result = classifier.predict("Show me gaming laptops under $1500")
    print(result)