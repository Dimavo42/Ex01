from beanie import Document
from pydantic import BaseModel
from typing import Optional



class Apartment(Document):
    adresss: str
    city:str
    price:int
    size:str
    floor:str
    rooms:int
    class Settings:
        name :str
    class Config:
        schema_extra ={
            "example": {
                "adresss": "Apartment Type",
                "city": "TelAviv",
                "price": 1500,
                "size": "big size",
                "floor": "floor number",
                "rooms": 4
            }
        }



class UpdateApartment(BaseModel):
    city:Optional[str]
    price:Optional[int]
    size:Optional[str]
    floor:Optional[str]
    rooms:Optional[int]
    class Config:
        schema_extra ={
            "example": {
                "adresss": "TelAviv",
                "price": 1500,
                "size": "big size",
                "floor": "floor number",
                "rooms": 4
            }
        }

         
    
    
    





