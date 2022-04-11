const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Number,
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
    service_status: {
        type: Boolean,
    },

    service_requiredin_address: {
        type: String,
        required: true

    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        address: {
            type: String,
            required: true
        },
        formattedAddress: {
            type: String,
        },
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zipcode: {
            type: String,
        },
        country: {
            type: String,
        },
    }

}, { timeseries: true });