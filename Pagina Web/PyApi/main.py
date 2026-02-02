from fastapi import FastAPI, HTTPException
from models import Message
from database import initializeDB

app = FastAPI()

@app.get('/')
async def welcome(): 
    await initializeDB()
    return {'message': 'Hello!'}