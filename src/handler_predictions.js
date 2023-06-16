const axios = require('axios');

// Flask Web Server
// endpoint = 'http://127.0.0.1:5000'
endpoint = 'https://pondpediaprediction-ismbpqewoa-as.a.run.app';

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

module.exports = {
    getPredictionsWaterHandler,
    getPredictionsFishGrowthHandler,
    helloPondPedia
};



// Might be useful later

// const Joi = require('@hapi/joi');
// const fs = require('fs').promises;
// const path = require('path');
// const bcrypt = require('bcrypt');
// const escape = require('pg-escape');
// const Hoek = require('hoek');
// const validator = require('validator');
