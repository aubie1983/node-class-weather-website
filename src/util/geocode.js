const request = require('postman-request')

const geocode = (address,callback) => {
    const apiKey = 'access_token=pk.eyJ1IjoiYXViaWU4MyIsImEiOiJja2Z5bWZlNXIwYnV4MnBxc3JnYjA4cHdyIn0.F8LKBfFzP0z57lrkm2G3kw';
    const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const url = mapboxBaseUrl + encodeURIComponent(address) + '.json' + '?' + apiKey;
    request({url:url,json:true},(error,{body})=>{
        if(error) {
            callback('Unable to connect to location services',undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find ' + address,undefined);
        } else {
            callback(undefined,{
                place_name:  body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            });
        }
    });
}

module.exports = geocode;