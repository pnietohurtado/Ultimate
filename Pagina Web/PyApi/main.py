from fastapi import FastAPI, HTTPException
from models import Message

app = FastAPI()

@app.get('/')
async def welcome(): 
    return {'message': 'Hello!'}