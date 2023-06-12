const tf = require('@tensorflow/tfjs');
const Joi = require('@hapi/joi');
const fs = require('fs').promises;
const path = require('path');

const pondpedia = require('./pondpedia');

const model_path = path.join(__dirname, 'model.h5');

// get predictions data from ML
const addPredictionsHandler = async (request, h) => {
    const model = await tf.loadLayersModel(`file://${MODEL_PATH}`);
    const prediction = model.predict(tf.tensor2d([[1, 2, 3]]));
    return prediction.dataSync();
};

// post predictions data from ML to users
const createPredictionsHandler = async (request, h) => {
    const { payload } = request;
    const { error } = Joi.object({
      input: Joi.array().items(Joi.number()).required()
    }).validate(payload);

    if (error) {
      return h.response(error.details[0].message).code(400);
    }

    const model = await tf.loadLayersModel(`file://${MODEL_PATH}`);
    const inputTensor = tf.tensor2d([payload.input]);
    const prediction = model.predict(inputTensor);
    const predictionData = prediction.dataSync()[0];
    const newPrediction = {
      id: Date.now(),
      input: payload.input,
      prediction: predictionData
    };
    const predictionList = await this.getPredictionList();
    predictionList.push(newPrediction);
    await this.savePredictionList(predictionList);

    return newPrediction;
};

// update data from users
const updatePredictionsHandler = async (request, h) => {
    const { id } = request.params;
    const { payload } = request;
    const { error } = Joi.object({
      input: Joi.array().items(Joi.number())
    }).validate(payload);

    if (error) {
      return h.response(error.details[0].message).code(400);
    }

    const predictionList = await this.getPredictionList();
    const predictionIndex = predictionList.findIndex(prediction => prediction.id === parseInt(id));

    if (predictionIndex === -1) {
      return h.response('Prediction not found').code(404);
    }

    const updatedPrediction = {
      ...predictionList[predictionIndex],
      ...payload
    };
    predictionList[predictionIndex] = updatedPrediction;
    await this.savePredictionList(predictionList);

    return updatedPrediction;
};

// delete predictions data by users
const deletePredictionsHandler = async (request, h) => {
    const { id } = request.params;
    const predictionList = await this.getPredictionList();
    const predictionIndex = predictionList.findIndex(prediction => prediction.id === parseInt(id));

    if (predictionIndex === -1) {
      return h.response('Prediction not found').code(404);
    }

    predictionList.splice(predictionIndex, 1);
    await this.savePredictionList(predictionList);

    return h.response().code(204);
};

// register account by users
const registerHandler = async (request, h) => {
    
};

// login account by users
const loginHandler = async (request, h) => {
    
};

module.exports = {
    addPredictionsHandler,
    createPredictionsHandler,
    updatePredictionsHandler,
    deletePredictionsHandler,
    registerHandler,
    loginHandler
};