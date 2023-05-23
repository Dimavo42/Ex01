from pydantic import BaseModel
from typing import Optional, List
from schema.apartment import Apartment



class ItemResponse(BaseModel):
    status: Optional[dict]
    number_of_items: Optional[List[Apartment]]
    method: str