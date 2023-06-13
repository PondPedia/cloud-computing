const {
    addPredictionsHandler,
    createPredictionsHandler,
    updatePredictionsHandler,
    deletePredictionsHandler,
    registerHandler,
    loginHandler,
    helloWorld
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: helloWorld
    },
    {
        // predictions from ML
        method: 'GET',
        path: '/pondpedia',
        handler: addPredictionsHandler,
    },
    {
        // predictions from ML to users
        method: 'POST',
        path: '/pondpedia',
        handler: createPredictionsHandler,
    },
    {
        // update data from users
        method: 'PATCH',
        path: '/pondpedia/{id}',
        handler: updatePredictionsHandler,
    },
    {
        // delete predictions by users
        method: 'DELETE',
        path: '/pondpedia/{id}',
        handler: deletePredictionsHandler,
    },
    {
        // register account by users
        method: 'POST',
        path: '/register',
        handler: registerHandler,
    },
    {
        // login account by users
        method: 'POST',
        path: '/login',
        handler: loginHandler,
    },
];

module.exports = routes;