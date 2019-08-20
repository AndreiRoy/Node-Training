const request = require('request')

const forecast = (value1,value2, callback) => {
    const url = 'https://api.darksky.net/forecast/9e367bdd79a7b6abd1e930775c789f20/' + value1 +','+ value2
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " chance to rain.")
        }
    })
}

module.exports = forecast