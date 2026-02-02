from motor.motor_asyncio import AsyncIOMotorClient
from models import Message,WhoIs
from bson import ObjectId

message = AsyncIOMotorClient('mongodb://localhost:27017/')
database = message.FinalDataBase2
collection = database.messages

async def initializeDB():
    count = await collection.count_documents({})
    if count == 0:
        await collection.insert_one({
            '_id': 1,
            'chatRoom': 'pnh0002',
            'messages': [{
                'message': 'Hola que tal',
                'who': WhoIs.USER.value
            }]
        })
        print("Base de datos inicializada")
    else:
        print(f"Base de datos ya tiene {count} documentos")

async def get_one_message(id: int):
    message_doc = await collection.find_one({'_id':id})
    if message_doc:
        return Message(**message_doc)
    return None

async def get_all_messages():
    messages = []
    cursor = collection.find({})
    async for document in cursor:
        # Asegurar que el documento tiene todos los campos requeridos
        if 'name' in document and 'surname' in document and 'ticket' in document:
            messages.append(Message(**document))
    return messages

async def send_message(message: dict):
    if '_id' not in message:
        # Generar un nuevo ID si no se proporciona
        last_message = await collection.find_one(sort=[('_id', -1)])
        message['_id'] = last_message['_id'] + 1 if last_message else 1
    
    await collection.insert_one(message)
    created_client = await collection.find_one({'_id': message['_id']})
    return Message(**created_client) if created_client else None