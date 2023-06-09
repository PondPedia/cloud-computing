const {
    addPredictionsHandler,
    createPredictionsHandler,
    updatePredictionsHandler,
    deletePredictionsHandler,
    registerHandler,
    loginHandler
} = require('./handler');

const routes = [
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
        path: '/pondpedia',
        handler: updatePredictionsHandler,
    },
    {
        // delete predictions by users
        method: 'DELETE',
        path: '/pondpedia',
        handler: deletePredictionsHandler,
    },
    {
        // register account by users
        method: 'POST',
        path: '/pondpedia',
        handler: registerHandler,
    },
    {
        // login account by users
        method: 'POST',
        path: '/pondpedia',
        handler: loginHandler,
    },
];

module.exports = routes;