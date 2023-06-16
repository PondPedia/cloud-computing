const Joi = require('@hapi/joi');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const escape = require('pg-escape');
const Hoek = require('hoek');
const validator = require('validator');

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

// register account by users
const userData = {
  email: Joi.string().email().required(),
  username: Joi.string(),
  password: Joi.string().password().required(),
};

function register(request, reply) {
  const email = help.escape(request.payload.email);
  const username = help.escape(request.payload.username);
  const password = help.escape(request.payload.password);
  const select = escape('SELECT *FROM people WHERE (email= %L)', email);

  request.pg.client.query(select, (err, result) => {
    if (err || result.rowCount === 0) {
      bcrypt.gensSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const q = 'INSERT INTO %s (email, username, password) VALUES (%L, %L, %L)';
          const insert = escape(q, 'people', email, username, hash);
          request.pg.client.query(insert, (err, result) => {
            Hoek.assert(!err, 'ERROR: inserting data into Postgres', err);
            return reply.view('success', {
              email,
              username,
            });
          });
        });
      });
    } else {
      return reply.view('index', {
        title: 'Please try insert a different email.',
        error: { email: { message: 'Email has already bees registered.' } },
        values: {
          email,
          username,
          password,
        },
      }).code(400);
    }
  });
}

const registerHandler = async (request, reply, error) => {
  if (!request.payload || request.payload && error && error.data) {
    return reply.view('index', {
      title: `Please register${request.server.version}`,
      error: help.extract_validation_error(error),
      values: help.return_form_input_values(error),
    }).code(400);
  }
  return register(request, reply);
};

// login account by users
const loginHandler = async (request, h) => {
  
};


module.exports = {
    getPredictionsWaterHandler,
    getPredictionsFishGrowthHandler,
    registerHandler,
    loginHandler,
    helloPondPedia
};