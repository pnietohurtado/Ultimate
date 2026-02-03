from fastapi import FastAPI, HTTPException
from models import Message
from database import initializeDB,add_message
from models import WhoIs

app = FastAPI()

@app.get('/')
async def welcome(): 
    await initializeDB()
    await add_message(WhoIs.USER.value, 'Mensaje desde mongoDB')
    return {'message': 'Hello!'}