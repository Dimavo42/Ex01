from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
import app_functions as local_db
from fastapi.middleware.cors import CORSMiddleware
from pulldata import start_pulling_data

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ItemResponse(BaseModel):
    response_status :Optional[dict]
    number_of_items: Optional[dict]
    method: str


class DataModel(BaseModel):
    citySelected: str = ''
    minimumRoom: int = 0
    maximumRoom: int = 0
    minimumPrice: int = 0 
    maximumPrice: int = 0 
    numberPages:int = 0

@app.get("/")
async def get_root():
    return {"message": "Yad2 Json ", "method": "GET"}


@app.post("/")
async def post_root():
    return {"message": "Yad2 Json", "method": "POST"}


@app.get("/item")
async def get_item(
    number_items: Optional[int] = None,
    room_start: Optional[int] = None,
    room_end: Optional[int] = None,
    price_start: Optional[int] = None,
    price_end: Optional[int] = None,
    max_item: Optional[bool] = False,
    min_item: Optional[bool] = False,
):
    if number_items is not None:
        if not local_db.find_item(number_items):
            return ItemResponse(response_status={"message": "Item not found"},method="GET")
        all_items = local_db.get_number_of_items(number_items)
        item_response = ItemResponse(number_of_items=all_items, method="GET")
        return item_response

    if room_start is not None and room_end is not None:
        items = local_db.get_between_start_end(room_start, room_end, "rooms")
        item_response = ItemResponse(number_of_items=items, method="GET")
        return item_response

    if price_start is not None and price_end is not None:
        items = local_db.get_between_start_end(price_start, price_end, "price")
        item_response = ItemResponse(number_of_items=items, method="GET")
        return item_response

    if max_item:
        item = local_db.get_maxuim_minium_price("max")
        item_response = ItemResponse(number_of_items=item, method="GET")
        return item_response

    if min_item:
        item = local_db.get_maxuim_minium_price("min")
        item_response = ItemResponse(number_of_items=item, method="GET")
        return item_response
    
    all_items = local_db.get_all_items()
    return ItemResponse(number_of_items=all_items,method="GET")


@app.get("/item/{item_id}")
async def get_item(item_id: int):
    if not local_db.find_item(item_id):
        return ItemResponse(response_status={"message": "Item not found"},method="GET")
    item = local_db.get_item(item_id)
    return ItemResponse(number_of_items=item,method="GET")


@app.post("/item/{item_id}")
async def update_item(item_id: int, updated_item: dict):
    if not local_db.find_item(item_id):
        return ItemResponse(response_status={"message": "Item not found"},method="GET")
    local_db.update_item(item_id, updated_item)
    return ItemResponse(response_status={"message": "Updated"},method="POST")


@app.post("/newtable")
async def get_new_table(params: DataModel):
    dict_of_parmas = params.dict()
    scrap_data = start_pulling_data(dict_of_parmas)
    return ItemResponse(number_of_items=local_db.get_all_items(dict_of_parmas["citySelected"]+".csv"),method="POST")










