const {
    getPredictionsWaterHandler,
    getPredictionsFishGrowthHandler,
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
        // Water predictions from ML
        method: 'POST',
        path: '/predict/water',
        handler: getPredictionsWaterHandler,
    },
    {
        // Fish Growth predictions from ML
        method: 'POST',
        path: '/predict/fishgrowth',
        handler: getPredictionsFishGrowthHandler,
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