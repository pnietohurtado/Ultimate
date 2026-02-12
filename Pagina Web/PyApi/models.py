from pydantic import BaseModel, Field 
from typing import Optional
from datetime import datetime 
from enum import Enum 

class WhoIs(Enum): 
    USER="user"
    OTHER="other"

class Data(BaseModel): 
    message: str 
    date:  Optional[datetime] = Field(default_factory=datetime.now)
    who: WhoIs

class Message(BaseModel): 
    _id: Optional[int] = None
    chatRoom: str 
    messages:Data = []