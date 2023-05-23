from beanie import PydanticObjectId
from fastapi import APIRouter
from schema.apartment import Apartment, UpdateApartment
from typing import Optional
from schema.item_response import ItemResponse

router = APIRouter()






@router.get("/")
async def get_item(
    number_items: Optional[int] = None,
    room_start: Optional[int] = None,
    room_end: Optional[int] = None,
    price_start: Optional[int] = None,
    price_end: Optional[int] = None,
    max_item: Optional[bool] = False,
    min_item: Optional[bool] = False,
    collection_name: Optional[str] = None,
):
    query = {}
    if room_start is not None and room_end is not None:
        query["rooms"] = {"$gte": room_start, "$lte": room_end}
    if price_start is not None and price_end is not None:
        query["price"] = {"$gte": price_start, "$lte": price_end}
    if collection_name:
        query["type_city"]=collection_name
    if query:
        items = await Apartment.find(query).to_list()
    else:
        items = await Apartment.find({}).to_list()
    if max_item:
        items.sort(key=lambda x: x.price, reverse=True)
        items = items[:1]
    elif min_item:
        items.sort(key=lambda x: x.price)
        items = items[:1]
    elif number_items is not None:
        items = items[:number_items]
    return ItemResponse(
        status={"message": "Success"}, number_of_items=items, method="GET"
    )


@router.get("/{item_id}")
async def get_item(item_id: PydanticObjectId):
    item = await Apartment.get(item_id)
    if not item:
        raise ItemResponse(status_code={"message": "Failed"}, method="GET")
    return ItemResponse(number_of_items=[item], method="GET")


@router.post("/{item_id}")
async def update_item(item_id: PydanticObjectId, request: UpdateApartment):
    request = {key: value for key, value in request.dict().items() if value is not None}
    update_query = {"$set": {field: value for field, value in request.items()}}
    apartment = await Apartment.get(item_id)
    if not apartment:
        raise ItemResponse(status={"message": "Failed"}, method="POST")
    await apartment.update(update_query)
    return ItemResponse(status={"message": "Updated"}, method="POST")




