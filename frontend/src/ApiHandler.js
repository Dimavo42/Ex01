export async function fetchFirstData() {
  const data = await fetchDataAndExtractValues("http://localhost:8000/item");
  return data;
}

export async function fetchMainPageData(params) {
  const data = await postData("http://localhost:8000/newtable", params);
  return data;
}

export async function fetchOpreationsMiniuim() {
  const data = await fetchDataAndExtractValues(
    "http://localhost:8000/item?min_item=true"
  );
  return data;
}
export async function fetchOpreationsMaxuim() {
  const data = await fetchDataAndExtractValues(
    "http://localhost:8000/item?max_item=true"
  );
  return data;
}

export async function fetchOpreationBetweenPriceRange(params) {
  const data = await fetchDataAndExtractValues(
    `http://localhost:8000/item?price_start=${params.minPrice}&price_end=${params.maxPrice}`
  );
  return data;
}

export async function fetchOpreationNumberOfApartments(params) {
  const data = await fetchDataAndExtractValues(
    `http://localhost:8000/item?number_items=${params.numApartments}`
  );
  return data;
}

export async function updateApartmentsDataAPI(params,index){
  const result =  await postData(`http://localhost:8000/item/${index}`,params);
  return result;
}

async function fetchDataAndExtractValues(endpoint) {
  const url = new URL(endpoint);
  return fetch(url)
    .then((response) => response.json())
    .then((data) => Object.values(data.number_of_items))
    .catch((error) => {
      console.log("error have been fatched:", error);
      return [];
    });
}

async function postData(endpoint, params = {}) {
  const url = new URL(endpoint);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.number_of_items) {
        return Object.values(data.number_of_items);
      } else if (data.response_status) {
        return data.message;
      }
      return data;
    })
    .catch((error) => {
      console.log("error have been fatched:", error);
      return [];
    });
}

