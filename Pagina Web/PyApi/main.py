from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Message
from database import initializeDB,add_message, get_all_messages
from models import WhoIs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def welcome(): 
    await initializeDB()
    await add_message(WhoIs.USER.value, 'Mensaje desde mongoDB')
    return {'message': 'Hello!'}


@app.post('/api/sendmessage/{chatRoom}/{message}')
async def sendMessage(chatRoom: str, message:str): 
    await add_message(WhoIs.USER, message); 
    return {'message': 'Everything send correctly'}


@app.get('/api/getmessages')
async def getAllMessages(): 
    messages = await get_all_messages() 
    return messages