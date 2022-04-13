const NodeGeocoder = require('node-geocoder');
const options = {
    provider:'mapquest',
    httpAdapter: 'https',
    apiKey:'52EkyczOCCsoX2EC4QuHkq31SmFCnAAp',
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