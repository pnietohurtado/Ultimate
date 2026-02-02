from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get('/')
async def welcome(): 
    return {'message': 'Hello!'}