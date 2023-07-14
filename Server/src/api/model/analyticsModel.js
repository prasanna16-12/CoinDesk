const conn = require('../config/mySqlConnection')


module.exports = {

    // Gets the data from database within date ranges
    getBotcoinRates : (fromDateTime, toDateTime) =>{
        
    },

    addBitcoinRates: (updatedOn, USD, GBP, EUR) => {
        return new Promise((resolve, reject) => {
            conn.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call sp_insert_coindesk_data(?, ?, ?, ?);',
                    [updatedOn, USD, GBP, EUR],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    }


}