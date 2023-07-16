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
        // automatically rerun after 10 mins
        1000 * 5 * 60
    )
}

module.exports = fetchData
