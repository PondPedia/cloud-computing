const Joi = require('joi');

const {
    getPredictionsWaterHandler,
    getPredictionsFishGrowthHandler,
    helloPondPedia
} = require('./handler_predictions');
const {
    registerHandler, 
    loginHandler
} = require('./user_handler');


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
    {
        // Register account by users
        method: 'POST',
        path: '/register',
        options: {
            validate: {
              payload: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required()
              })
            }
        },
        handler: registerHandler,
    },
    {
        // Login account by users
        method: 'POST',
        path: '/login',
        options: {
            validate: {
              payload: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
              })
            }
        },
        handler: loginHandler,
    },
    {
        method: 'GET',
        path: '/protected',
        config: {
          auth: 'jwt'
        },
        handler: function (request, h) {
            return { message: 'You are authorized to access this route!' };
        }
    }
];

module.exports = routes;