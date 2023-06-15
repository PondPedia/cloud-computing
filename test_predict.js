// endpoint = 'https://localhost:8000'
endpoint = 'https://pondpediaapi-ismbpqewoa-as.a.run.app'

const axios = require('axios');

axios.get(`${endpoint}/predict/water`).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.error(error)
})

axios.get(`${endpoint}/predict/fishgrowth`).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.error(error)
})