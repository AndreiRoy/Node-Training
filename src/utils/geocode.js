/* const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmVpcmwiLCJhIjoiY2p5cW96dm5sMDJuejNkbnRqMmlpbGtsYiJ9.o0XO3dIoLeNsBqpF25DEeA'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            const features = response.body.features
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
 */

const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmVpcmwiLCJhIjoiY2p5cW96dm5sMDJuejNkbnRqMmlpbGtsYiJ9.o0XO3dIoLeNsBqpF25DEeA'
    
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            const features = body.features
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
