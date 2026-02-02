from motor.motor_asyncio import AsyncIOMotorClient
from models import Client
from bson import ObjectId

client = AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.FinalDataBase
collection = database.clients

async def initializeDB():
    count = await collection.count_documents({})
    if count == 0:
        await collection.insert_one({
            '_id': 1,
            'name': 'Pablo',
            'surname': 'Nieto',
            'ticket': 23
        })
        print("Base de datos inicializada")
    else:
        print(f"Base de datos ya tiene {count} documentos")

async def get_one_client(id: int):
    client_doc = await collection.find_one({'_id':id})
    if client_doc:
        return Client(**client_doc)
    return None

async def get_all_client():
    clients = []
    cursor = collection.find({})
    async for document in cursor:
        # Asegurar que el documento tiene todos los campos requeridos
        if 'name' in document and 'surname' in document and 'ticket' in document:
            clients.append(Client(**document))
    return clients

async def create_client(client_data: dict):
    if '_id' not in client_data:
        # Generar un nuevo ID si no se proporciona
        last_client = await collection.find_one(sort=[('_id', -1)])
        client_data['_id'] = last_client['_id'] + 1 if last_client else 1
    
    await collection.insert_one(client_data)
    created_client = await collection.find_one({'_id': client_data['_id']})
    return Client(**created_client) if created_client else None