const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: '0Erb8h3E6X1FwM7zVHkiJ2AQYUzNdb7Y',
    formatter:'null'
};


// %P country
// %p country code

// %n street number
// %S street name
// %c City
// %z zip code


// %T State
// %t state code

const geocoder = NodeGeocoder(options);

module.exports = geocoder;