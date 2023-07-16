require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 5000

// middleware
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))


//routine
const fetchData = require('./src/routine/fetchData')


// router
const routerAnalytics = require('./src/api/router/analyticsRouter')

// analytic endpoint
app.use('/api/coindesk/v1/analytics', routerAnalytics)

app.all('*', (req, res) => {
    const err = new Error(`Requested url ${req.url} not found`)
    res.status(404).json({
        message: err.message
    })
})


//staring server
app.listen(PORT, () => {

    // fetch data activity
    fetchData()

    console.log(`App is running ${PORT}`)
})