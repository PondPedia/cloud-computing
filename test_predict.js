const axios = require('axios');

axios.get('http://localhost:8000/pondpedia/predict/water').then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.error(error)
})