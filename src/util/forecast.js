const request = require('postman-request')

// Weather Stack
const forecast = (lat, lon, callback) => {
    const baseURL = "http://api.weatherstack.com/";
    const apiKey = '2884d362254b2bbe0cef4c2878820bc8';
    const url = baseURL + 'current?access_key=' + apiKey + "&" + 'query=' + lat + "," + lon + '&units=f';

    request({url: url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to Weather Stack', undefined);
        } else {
            if (body.error) {
                callback('Error finding weather for ' + lat + ', ' + lon, undefined);
            } else {
                callback(undefined, {
                    local_time: body.location.localtime,
                    utc_offset: body.location.utc_offset,
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    wind_speed: body.current.wind_speed,
                    wind_dir: body.current.wind_dir,
                    humidity: body.current.humidity
                });
            }
        }
    });
};

module.exports = forecast;
