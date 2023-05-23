from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
import motor.motor_asyncio
from schema.apartment import Apartment
from routes.apartment_item import router as itemRouter
from routes.apartment_table import router as tableRouter
from scripts.pulldata import start_pulling_data

app = FastAPI()
app.include_router(itemRouter,tags=["apartments"],prefix="/item")
app.include_router(tableRouter,tags=["table"])


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



@app.get("/")
async def get_root():
    return {"message": "Yad2 Json ", "method": "GET"}




@app.on_event("startup")
async def start_db():
    await init_db()
    apartments :list[Apartment] = await start_pulling_data({"citySelected":"TelAviv",
                        "minimumRoom":2,
                        "maximumRoom":5,
                        "minimumPrice":1000000,
                        "maximumPrice":3000000,
                        "numberPages":1})
    await Apartment.insert_many(apartments)
    

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        "mongodb:///root:example@mongodb:27017"
    )
    await init_beanie(database=client.Yad2, document_models=[Apartment])
       







