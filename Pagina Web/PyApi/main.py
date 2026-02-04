from fastapi import FastAPI, HTTPException
from models import Message
from database import initializeDB,add_message, get_all_messages
from models import WhoIs

app = FastAPI()

@app.get('/')
async def welcome(): 
    await initializeDB()
    await add_message(WhoIs.USER.value, 'Mensaje desde mongoDB')
    return {'message': 'Hello!'}


@app.get('/api/sendmessage/{who}/{message}')
async def sendMessage(who: WhoIs, message:str): 
    await add_message(who, message); 
    return {'message': 'Everything send correctly'}


@app.get('/api/getmessages')
async def getAllMessages(): 
    await get_all_messages() 
    return {'message': 'Getting all the messages'}