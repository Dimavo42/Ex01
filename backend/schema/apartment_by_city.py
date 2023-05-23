from pydantic import BaseModel

class ApartmentCity(BaseModel):
    citySelected: str = ''
    minimumRoom: int = 0
    maximumRoom: int = 0
    minimumPrice: int = 0 
    maximumPrice: int = 0 
    numberPages:int = 0
