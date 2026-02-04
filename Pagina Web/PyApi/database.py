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
    cursor = collection.find({"chatRoom": "pnh0002"}, 
                             {"messages":1, "_id": 0})
    documents = await cursor.to_list(length=None)

    all_messages = []
    for doc in documents: 
        if "message" in doc: 
            all_messages.extend(doc["messages"])

    return all_messages

async def send_message(message: dict):
    if '_id' not in message:
        # Generar un nuevo ID si no se proporciona
        last_message = await collection.find_one(sort=[('_id', -1)])
        message['_id'] = last_message['_id'] + 1 if last_message else 1
    
    await collection.insert_one(message)
    created_client = await collection.find_one({'_id': message['_id']})
    return Message(**created_client) if created_client else None



# Function to add a object into the chatRoom array 
async def add_message(who: WhoIs, message: Message): 
    await collection.update_one(
        {'_id': 1},
        { '$push': {
            'messages': {
                'message': message,
                'who': who
            }
        }}
    ); 