from typing import Union
from transformers import pipeline
from fastapi import FastAPI

app = FastAPI()


@app.get("/{text}")
def detect_emotion(text : str):
    emotion = pipeline('sentiment-analysis', 
                        model='arpanghoshal/EmoRoBERTa')
    emotion_labels = emotion(text)
    output_emotion = emotion_labels[0]['label']
    output_score = emotion_labels[0]['score']

    flag=0
    if emotion_labels[0]['label'] == 'anger' and emotion_labels[0]['score'] >= 0.85:
        flag=1

    if emotion_labels[0]['label'] == 'annoyance' and emotion_labels[0]['score'] >= 0.9:
        flag=1

    if emotion_labels[0]['label'] == 'nervousness' and emotion_labels[0]['score'] >= 0.65:
        flag=1

    if emotion_labels[0]['label'] == 'fear' and emotion_labels[0]['score'] >= 0.65:
        flag=1

    if emotion_labels[0]['label'] == 'desire' and emotion_labels[0]['score'] >= 0.9:
        flag=1

    if emotion_labels[0]['label'] == 'sadness' and emotion_labels[0]['score'] >= 0.7:
        flag=1

    if emotion_labels[0]['label'] == 'grief' and emotion_labels[0]['score'] >= 0.7:
        flag=1

    if emotion_labels[0]['label'] == 'remorseness' and emotion_labels[0]['score'] >= 0.7:
        flag=1
    return flag