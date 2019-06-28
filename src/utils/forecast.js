const request = require('request')



//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/74f7ea18b810fc29ef816fb87b9fc564/' + latitude + ','+ longitude + '?units=si&lang=pt'

    request({ url, json: true }, (error, { body }) =>{
        if (error) {
            callback('Unable to connect with forecast api', undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Atualmente está ' + body.currently.temperature + ' graus. Existe ' + body.currently.precipProbability + '% de chance de chuva.')
        }
    })

}

module.exports = forecast