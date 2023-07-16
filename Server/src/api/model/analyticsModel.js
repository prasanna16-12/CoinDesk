const conn = require('../config/mySqlConnection')


module.exports = {

    // Gets the data from database within date ranges
    getBotcoinRates: (fromDateTime, toDateTime) => {
        return new Promise((resolve, reject) => {
            conn.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call sp_fetch_coindesk_data(?, ?);',
                    [fromDateTime, toDateTime],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })
        })
    },

    addBitcoinRates: (updatedOn, USD, GBP, EUR) => {

        let cheapest_to_buy = get_cheapest_to_buy(USD, GBP, EUR)
        let expensive_to_buy = get_expensive_to_buy(USD, GBP, EUR)
        //console.log(cheapest_to_buy, expensive_to_buy)
        return new Promise((resolve, reject) => {
            conn.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call sp_insert_coindesk_data(?, ?, ?, ?, ?, ?);',
                    [updatedOn, USD, GBP, EUR, cheapest_to_buy, expensive_to_buy],
                    (error, results) => {

                        if (error) return reject(error)
                        console.log('data inserted');
                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })

        function get_cheapest_to_buy(USD, GBP, EUR) {

            let USD_GBP = (GBP / 0.75).toFixed(4)
            let USD_EUR = (EUR / 0.90).toFixed(4)

            if ((USD > USD_EUR) && (USD > USD_GBP) && (USD_GBP > USD_EUR))
                return 'EUR'

            else if ((USD > USD_EUR) && (USD > USD_GBP) && (USD_GBP < USD_EUR))
                return 'GBP'

            else if ((USD < USD_EUR) && (USD > USD_GBP) && (USD_GBP < USD_EUR))
                return 'GBP'

            else if ((USD < USD_EUR) && (USD < USD_GBP) && (USD_GBP < USD_EUR))
                return 'USD'

            else if ((USD < USD_EUR) && (USD < USD_GBP) && (USD_GBP > USD_EUR))
                return 'USD'

            else
                return 'EUR'


        }


        function get_expensive_to_buy(USD, GBP, EUR) {

            let USD_GBP = (GBP / 0.75).toFixed(4)
            let USD_EUR = (EUR / 0.90).toFixed(4)

            if ((USD > USD_EUR) && (USD > USD_GBP) && (USD_GBP > USD_EUR))
                return 'USD'

            else if ((USD > USD_EUR) && (USD > USD_GBP) && (USD_GBP < USD_EUR))
                return 'USD'

            else if ((USD < USD_EUR) && (USD > USD_GBP) && (USD_GBP < USD_EUR))
                return 'EUR'

            else if ((USD < USD_EUR) && (USD < USD_GBP) && (USD_GBP < USD_EUR))
                return 'EUR'

            else if ((USD < USD_EUR) && (USD < USD_GBP) && (USD_GBP > USD_EUR))
                return 'GBP'

            else
                return 'GBP'

        }
    }


}