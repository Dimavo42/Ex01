

async function fetchFirstData() {
  const data = await fetchGetDataNoParams("http://localhost:8000/item");
  return data;
}

async function fetchFormData(params) {
  const data = await postData("http://localhost:8000/newtable",params);
  return data;
}

async function fetchMiniuim(){
  const data = await fetchGetDataNoParams("http://localhost:8000/item?min_item=true");
  return data;
}

async function fetchGetDataNoParams(endpoint) {
  const url = new URL(endpoint);
  return fetch(url)
    .then((response) => response.json())
    .then((data) => Object.values(data.item))
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
    body: JSON.stringify(params),
  }).then((response) => response.json())
  .then((data) => Object.values(data.item))
  .catch((error) => {
    console.log("error have been fatched:", error);
    return [];
  });
}


  

export   { fetchFormData, fetchFirstData,fetchMiniuim };
