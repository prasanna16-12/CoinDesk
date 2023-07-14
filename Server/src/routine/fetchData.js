const axios = require('axios');


// contoller
const controllerAnalytics = require('../api/controller/analyticsController')

function fetchData() {
    setInterval(() => {

        axios.get(process.env.API)
            .then(result => {
                //console.log(result.data);
                controllerAnalytics.addBitcoinRates(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, 
        1000 * 10 * 60
    )
}

module.exports = fetchData
