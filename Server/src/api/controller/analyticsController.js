const modelAnalytics = require('../model/analyticsModel')


module.exports = {

    getBitcoinRates: async (req, res) => {
        try {
            const { from, to } = req.query
            //console.log(from, to);
            const _from = new Date(new Date(from).getTime() - (330 * 60000))
            const _to = new Date(new Date(to).getTime() - (330 * 60000))

            console.log('Data requested for ' + _from.toISOString() + ", " + _to.toISOString());
            let data = await modelAnalytics.getBotcoinRates(_from, _to)


            for (let index = 0; index < data.length; index++) {
                let date = new Date(data[index].updated_on)
                data[index].updated_on = new Date(date.setHours(date.getHours() + 11))
            }

            let cheapest_to_buy_dict = new Map()
            let expensive_to_buy_dict = new Map()

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let exp = element.expensive_to_buy
                let cheap = element.cheapest_to_buy

                if (!cheapest_to_buy_dict.has(cheap)) {
                    cheapest_to_buy_dict.set(cheap, 0)
                }
                cheapest_to_buy_dict.set(cheap, cheapest_to_buy_dict.get(cheap) + 1)

                if (!expensive_to_buy_dict.has(exp)) {
                    expensive_to_buy_dict.set(exp, 0)
                }
                expensive_to_buy_dict.set(exp, expensive_to_buy_dict.get(exp) + 1)

            }

            let cheapest_to_buy_max_freq = ''
            let expensive_to_buy_max_freq = ''

            let cheap_max_value = 0
            cheapest_to_buy_dict.forEach((key, value) => {
                //console.log(key, value);
                if (cheap_max_value < key) {
                    cheap_max_value = key
                    cheapest_to_buy_max_freq = value
                }
            });

            let exp_max_value = 0
            expensive_to_buy_dict.forEach((key, value) => {
                //console.log(key, value);
                if (exp_max_value < key) {
                    exp_max_value = key
                    expensive_to_buy_max_freq = value
                }
            });


            //sorting data in descending order
            data.sort((a, b) => {
                return a.updated_on - b.updated_on;
            });

            return res.status(200).json({
                result: data,
                cheapestCurrencyToBuyBitCoin: { Currency: cheapest_to_buy_max_freq, Frequency: cheap_max_value },
                expensiveCurrencyToBuyBitCoin: { Currency: expensive_to_buy_max_freq, Frequency: exp_max_value },
                count: data.length,
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
            let updatedOn = data.time.updatedISO
            let USD = data.bpi.USD.rate_float
            let GBP = data.bpi.GBP.rate_float
            let EUR = data.bpi.EUR.rate_float
            await modelAnalytics.addBitcoinRates(updatedOn, USD, GBP, EUR)

        } catch (error) {
            console.log(error.message)
        }
    },

}