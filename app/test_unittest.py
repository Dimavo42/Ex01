from fastapi.testclient import TestClient
from  main import app
import pytest
import app_functions as test_df



@pytest.fixture()
def client_fixture():
    with TestClient(app) as _client:
        yield _client


def test_get_item(client_fixture:TestClient):
    response = client_fixture.get("/item/1")
    assert response.status_code == 200
    item = test_df.get_item(1)
    expected_item = {"item": item}
    assert response.json() == expected_item

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
    assert "item" in response.json()
    max_item = test_df.get_maxuim_minium_price("max")
    assert response.json()["item"] == max_item

def test_dafulet_item(client_fixture:TestClient):
    response = client_fixture.get("/item?number=3")
    assert response.json() == {"message": "Invalid request", "method": "GET"}

def test_get_min_item(client_fixture:TestClient):
    response = client_fixture.get("/item?min_item=true")
    assert response.status_code == 200
    assert "item" in response.json()
    min_item = test_df.get_maxuim_minium_price("min")
    assert response.json()["item"] == min_item


def test_update_item(client_fixture:TestClient):
    item_id = 5
    updated_item = {
        "city": "New York",
        "price": 5000,
        "size": 2000,
        "rooms": 3,
        "floor": 3,
    }
    response = client_fixture.post(f"/item/{item_id}",json=updated_item)
    assert response.status_code == 200
    assert response.json() == {
        "message": "Updated"
    }
    response = client_fixture.get(f"/item/{item_id}")
    assert response.json()["item"]["price"] == 5000

    


