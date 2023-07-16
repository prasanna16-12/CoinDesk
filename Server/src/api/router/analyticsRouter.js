const express = require('express')
const routerAnalytics = express.Router()


// contoller
const controllerAnalytics = require('../controller/analyticsController')

// validation
const validationAnalytics = require('../validation/analyticsValidation')


routerAnalytics
    .get(
        '/data',
        validationAnalytics,
        controllerAnalytics.getBitcoinRates
    )


module.exports = routerAnalytics