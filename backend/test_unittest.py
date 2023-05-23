from fastapi.testclient import TestClient
from  main import app
import pytest
import app_functions as test_df



@pytest.fixture()
def client_fixture():
    with TestClient(app) as _client:
        yield _client


def test_get_root(client_fixture:TestClient):
    response = client_fixture.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Yad2 Json ", "method": "GET"}


def test_post_root(client_fixture:TestClient):
    response = client_fixture.post("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Yad2 Json", "method": "POST"}

def test_get_item_not_found(client_fixture:TestClient):
    response = client_fixture.get("/item/-1")
    assert response.status_code == 200
    assert response.json()["response_status"] == {"message": "Item not found"}


def test_get_all_items(client_fixture:TestClient):
    response = client_fixture.get("/item")
    assert response.status_code == 200
    assert len(response.json()["number_of_items"]) > 0




def test_get_item(client_fixture:TestClient):
    response = client_fixture.get("/item/0")
    assert response.status_code == 200
    item = test_df.get_item(0)
    for r_item,t_item in zip( (response.json()["number_of_items"]).values(),item.values() ):
        assert r_item == t_item



def test_get_items_by_number(client_fixture:TestClient):
    response = client_fixture.get("/item?number_items=3")
    assert response.status_code == 200
    assert len(response.json()["number_of_items"]) == 3

def test_get_items_by_price_range(client_fixture:TestClient):
    response = client_fixture.get("/item?price_start=100000&price_end=1000000")
    assert response.status_code == 200
    items = test_df.get_between_start_end(100000, 1000000, "price")
    for number_items_in_request,number_of_items_df in zip(response.json()["number_of_items"],items):
        assert number_items_in_request == number_of_items_df
        

def test_get_max_item(client_fixture:TestClient):
    response = client_fixture.get("/item?max_item=true")
    assert response.status_code == 200
    assert "number_of_items" in response.json()
    max_item = test_df.get_maxuim_minium_price("max")
    for r_item,t_item in zip( (response.json()["number_of_items"]).values(),max_item.values() ):
        assert r_item == t_item



def test_get_min_item(client_fixture:TestClient):
    response = client_fixture.get("/item?min_item=true")
    assert response.status_code == 200
    assert "number_of_items" in response.json()
    min_item = test_df.get_maxuim_minium_price("min")
    for r_item,t_item in zip( (response.json()["number_of_items"]).values(),min_item.values() ):
        assert r_item == t_item


def test_update_item(client_fixture:TestClient):
    item_id = 5
    updated_item = {
        "city": "New York",
        "price": 5000,
        "size": "2000",
        "rooms": 3,
        "floor": "3",
    }
    response = client_fixture.post(f"/item/{item_id}",json=updated_item)
    assert response.status_code == 200
    assert response.json()["response_status"] == {
        "message": "Updated"
    }

    

def test_get_new_table(client_fixture:TestClient):
    data = {"citySelected": "TelAviv", "minimumRoom": 2, "maximumRoom": 3, "minimumPrice": 100000, "maximumPrice": 300000, "numberPages": 1}
    response = client_fixture.post("/newtable", json=data)
    assert response.status_code == 200
    assert len(response.json()["number_of_items"]) > 0






