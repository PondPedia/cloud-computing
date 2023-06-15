
// HAPI Web Server
endpoint = 'http://localhost:8000'
// endpoint = 'https://pondpediaapi-ismbpqewoa-as.a.run.app'

const axios = require('axios');

const dataset_water = require('./src/data.json');
const dataset_fishgrowth = require('./src/data_copy.json');

const bruh = JSON.stringify(dataset_water);
const bruh_2 = JSON.stringify(dataset_fishgrowth)

axios.post(`${endpoint}/predict/water`, bruh, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.error(error)
})

axios.post(`${endpoint}/predict/fishgrowth`, bruh_2, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.error(error)
})