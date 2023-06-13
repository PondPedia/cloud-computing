const {
    getPredictionsHandler,
    // createPredictionsHandler,
    // updatePredictionsHandler,
    // deletePredictionsHandler,
    registerHandler,
    loginHandler,
    helloPondPedia
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/pondpedia',
        handler: helloPondPedia
    },
    {
        // predictions from ML
        method: 'GET',
        path: '/pondpedia/predict/water',
        handler: getPredictionsHandler,
    },
    // {
    //     // predictions from ML to users
    //     method: 'POST',
    //     path: '/pondpedia',
    //     handler: createPredictionsHandler,
    // },
    // {
    //     // update data from users
    //     method: 'PATCH',
    //     path: '/pondpedia/{id}',
    //     handler: updatePredictionsHandler,
    // },
    // {
    //     // delete predictions by users
    //     method: 'DELETE',
    //     path: '/pondpedia/{id}',
    //     handler: deletePredictionsHandler,
    // },
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