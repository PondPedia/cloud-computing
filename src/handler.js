// const tf = require('@tensorflow/tfjs-node');
const Joi = require('@hapi/joi');
const fs = require('fs').promises;
const path = require('path');
const pondpedia = require('./pondpedia');
const axios = require('axios');


// Flask Web Server
endpoint = 'http://127.0.0.1:5000'
// endpoint = 'https://pondpediaprediction-ismbpqewoa-as.a.run.app';

// Get Water Predictions Data From ML
const getPredictionsWaterHandler = async (request, h) => {
  const url = `${endpoint}/water`;
  const jsonString = request.payload;

  try {
    const res = await axios.post(url, jsonString, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return h.response({
      message: res.data,
      success: true
    }).code(200);
  } catch (err) {
    return h.response({
      success: false,
      status: 'Fail!'
    }).code(400);
  }
};

// Get Fish Growth Predictions Data From ML
const getPredictionsFishGrowthHandler = async (request, h) => {
  const url = `${endpoint}/fishgrowth`;
  const jsonString = request.payload;

  try {
    const res = await axios.post(url, jsonString, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return h.response({
      message: res.data,
      success: true
    }).code(200);
  } catch (err) {
    return h.response({
      success: false,
      status: 'Fail!'
    }).code(400);
  }
}

// // post predictions data from ML to users
// const createPredictionsHandler = async (request, h) => {
//     const { payload } = request;
//     const { error } = Joi.object({
//       input: Joi.array().items(Joi.number()).required()
//     }).validate(payload);

//     if (error) {
//       return h.response(error.details[0].message).code(400);
//     }

//     const model = await tf.loadLayersModel(`file://${MODEL_PATH}`);
//     const inputTensor = tf.tensor2d([payload.input]);
//     const prediction = model.predict(inputTensor);
//     const predictionData = prediction.dataSync()[0];
//     const newPrediction = {
//       id: Date.now(),
//       input: payload.input,
//       prediction: predictionData
//     };
//     const predictionList = await this.getPredictionList();
//     predictionList.push(newPrediction);
//     await this.savePredictionList(predictionList);

//     return newPrediction;
// };

// // update data from users
// const updatePredictionsHandler = async (request, h) => {
//     const { id } = request.params;
//     const { payload } = request;
//     const { error } = Joi.object({
//       input: Joi.array().items(Joi.number())
//     }).validate(payload);

//     if (error) {
//       return h.response(error.details[0].message).code(400);
//     }

//     const predictionList = await this.getPredictionList();
//     const predictionIndex = predictionList.findIndex(prediction => prediction.id === parseInt(id));

//     if (predictionIndex === -1) {
//       return h.response('Prediction not found').code(404);
//     }

//     const updatedPrediction = {
//       ...predictionList[predictionIndex],
//       ...payload
//     };
//     predictionList[predictionIndex] = updatedPrediction;
//     await this.savePredictionList(predictionList);

//     return updatedPrediction;
// };

// // delete predictions data by users
// const deletePredictionsHandler = async (request, h) => {
//     const { id } = request.params;
//     const predictionList = await this.getPredictionList();
//     const predictionIndex = predictionList.findIndex(prediction => prediction.id === parseInt(id));

//     if (predictionIndex === -1) {
//       return h.response('Prediction not found').code(404);
//     }

//     predictionList.splice(predictionIndex, 1);
//     await this.savePredictionList(predictionList);

//     return h.response().code(204);
// };

const helloPondPedia = async (request, h) => {
  try {
    return h.response({
      message: "Welcome to PondPedia!",
      status: 'Success!'
    }).code(200);
  } catch (err) {
    return h.response({
      success: false,
      status: 'Fail!'
    }).code(400);
  }
}

// register account by users
const registerHandler = async (request, h) => {
    
};

// login account by users
const loginHandler = async (request, h) => {
  
};


module.exports = {
    getPredictionsWaterHandler,
    getPredictionsFishGrowthHandler,
    // createPredictionsHandler,
    // updatePredictionsHandler,
    // deletePredictionsHandler,
    registerHandler,
    loginHandler,
    helloPondPedia
};


// Install tensorflowjs, tensorflowjs-node
// convert to keras .h5 format model to .json format model using tensorflowjs-converter
// use file:// protocol to import the model