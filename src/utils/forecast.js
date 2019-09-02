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
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 'The high for today is ' + body.daily.data[0].temperatureHigh +' with a low of '+ body.daily.data[0].temperatureLow +' .There is a ' + body.currently.precipProbability + ' chance to rain.')
        }
    })
}

module.exports = forecast