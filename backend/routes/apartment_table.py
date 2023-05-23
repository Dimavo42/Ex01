from fastapi import APIRouter
from schema.apartment_by_city import ApartmentCity
from scripts.pulldata import start_pulling_data
from schema.apartment import Apartment
from schema.item_response import ItemResponse

router = APIRouter()


@router.post("/newtable")
async def get_new_table(params: ApartmentCity):
    dict_of_params = params.dict()
    apartments: list[Apartment] = await start_pulling_data(dict_of_params)
    for apartment in apartments:
        existing_apartment = await Apartment.find_one(
            {"city": apartment.city, "price": apartment.price}
        )
        if existing_apartment is None:
            await apartment.insert()
    address_param = params.citySelected
    sorted_apartments = (
        await Apartment.find({})
        .sort([("adresss", 1 if apartment.adresss == address_param else -1)])
        .to_list()
    )

    return ItemResponse(
        status={"message": "Success"}, number_of_items=sorted_apartments, method="POST"
    )
