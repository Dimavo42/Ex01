import axios from "axios";

export function getAllAppartments() {
  return axios.get("http://localhost:8000/item");
}

export function updateAppartment(appartment_id, params) {
  return axios.post(`http://localhost:8000/item/${appartment_id}`, params);
}

export function scrape(params) {
  return axios.post("http://localhost:8000/newtable", params);
}

export function getMinPrice() {
  return axios.get("http://localhost:8000/item?min_item=true");
}

export function getMaxPrice() {
  return axios.get("http://localhost:8000/item?max_item=true");
}

export function getByPriceRange(min, max) {
  return axios.get(`http://localhost:8000/item?price_start=${min}&price_end=${max}`);
}

export function getNumberOfAppartments(amount) {
  return axios.get(`http://localhost:8000/item?number_items=${amount}`);
}

export function getAppatmentsByCity(city_name) {
  return axios.get(`http://localhost:8000/item/city/${city_name}`);
}