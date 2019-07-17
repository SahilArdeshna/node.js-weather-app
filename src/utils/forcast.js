const request = require('request');

const forcast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/a4c5ba4b645713bc461fbe15d68e83d5/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
};
 
module.exports = forcast;