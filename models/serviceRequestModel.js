const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geocoder = require("../utils/geocoader");

const serviceRequestSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    number_plate: {
        type: String,
        required: true
    },
    service_type: {
        type: String,
        required: true
        // eg: ['Roadside Assistance', 'Car Wash', 'Oil Change', 'Tire Rotation', 'Other']
    },
    service_description: {
        type: String,
        required: true
    },
    
    service_requiredin_address: {
        type: String,
        required: true
    },
    service_requiredin_lat: {
        type: Number,
        required: true
    },
    service_requiredin_long: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'     
    },
   

},  {timestamps: true });


serviceRequestSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.service_requiredin_address);
    this.location ={
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
});


module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
