const modelAnalytics = require('../model/analyticsModel')


module.exports = {

    getBitcoinRates: async (req, res) => {
        try {
            //const data = await AdminModel.createNewUser(req.body)
            const { from, to } = req.query
            const _from = new Date(new Date(from).getTime() - (330 * 60000))
            const _to = new Date(new Date(to).getTime() - (330 * 60000))
            console.log(_from)
            console.log(_to);
            return res.status(201).json({
                result: req.query,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    addBitcoinRates: async (data) => {
        try {
            //const data = await AdminModel.createNewUser(req.body)
            let updatedOn = data.time.updatedISO
            let USD = data.bpi.USD.rate_float
            let GBP = data.bpi.GBP.rate_float
            let EUR = data.bpi.EUR.rate_float
            console.log(updatedOn, USD, GBP, EUR);
            await modelAnalytics.addBitcoinRates(updatedOn, USD, GBP, EUR)

        } catch (error) {
            console.log(error.message)
        }
    },

}