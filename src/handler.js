const pondpedia = require('./pondpedia');

const addPredictionsHandler = async (request, h) => {
    // get predictions data from ML
};

const createPredictionsHandler = async (request, h) => {
    // post predictions data from ML to users
};

const updatePredictionsHandler = async (request, h) => {
    // update data from users
};

const deletePredictionsHandler = async (request, h) => {
    // delete predictions data by users
};

const registerHandler = async (request, h) => {
    // register account by users
};

const loginHandler = async (request, h) => {
    // login account by users
};

module.exports = {
    addPredictionsHandler,
    createPredictionsHandler,
    updatePredictionsHandler,
    deletePredictionsHandler,
    registerHandler,
    loginHandler
};