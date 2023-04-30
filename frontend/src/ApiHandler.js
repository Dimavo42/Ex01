

async function fetchFirstData() {
  const data = await fetchDataAndExtractValues("http://localhost:8000/item");
  return data;
}

async function fetchMainPageData(params) {
  const data = await postData("http://localhost:8000/newtable",params);
  return data;
}

async function fetchOpreationsMiniuim(){
  const data = await fetchDataAndExtractValues("http://localhost:8000/item?min_item=true");
  return data;
}
async function fetchOpreationsMaxuim(){
  const data = await fetchDataAndExtractValues("http://localhost:8000/item?max_item=true");
  return data;
}

async function fetchOpreationBetweenPriceRange(params){
  const data = await fetchDataAndExtractValues(`http://localhost:8000/item?price_start=${params.minPrice}&price_end=${params.maxPrice}`);
  return data;
}

async function fetchOpreationNumberOfApartments(params){
  const data = await fetchDataAndExtractValues(`http://localhost:8000/item?number_items=${params.numApartments}`);
  return data;
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



async function postData(endpoint, params = {}){
  const url = new URL(endpoint);
  return fetch(url,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify(params)
  }).then((response) => response.json())
  .then((data) => Object.values(data.number_of_items))
  .catch((error) => {
    console.log("error have been fatched:", error);
    return [];
  });
}


  

export   { fetchMainPageData , fetchFirstData,fetchOpreationsMiniuim,fetchOpreationsMaxuim,fetchOpreationBetweenPriceRange,fetchOpreationNumberOfApartments };
