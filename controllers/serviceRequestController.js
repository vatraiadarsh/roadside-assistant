const ServiceRequest = require("../models/serviceRequestModel");
const asyncHandler = require("express-async-handler");

const geocoder = require("../utils/geocoader");

exports.IncommingServiceRequest = asyncHandler(async (req, res, next) => {

    const { model, make, year, number_plate, service_type, service_description, service_requiredin_address } = req.body;
   
    if(!model || !make || !year || !number_plate || !service_type || !service_description || !service_requiredin_address) {
        return res.status(400).json({
            error: "Please enter all fields"
        });
    }
    const geocoader = await geocoder.geocode(service_requiredin_address);
    if (geocoader.length === 0) {
        return res.json({ error: "No such address found! Invalid address" });
    }

    const serviceRequest = await ServiceRequest.create({
        user: req.user._id,
        model,
        make,
        year,
        number_plate,
        service_type,
        service_description,
        service_requiredin_address: geocoader[0].formattedAddress,
        service_requiredin_lat: geocoader[0].latitude,
        service_requiredin_long: geocoader[0].longitude,

    });

    if (serviceRequest) {
        res.status(200).json({
            serviceRequest
        });
    } else {
        res.status(400).json({
            error: "Service request not created"
        });
    }

    next();
});

exports.requestedServiceByUser = asyncHandler(async (req, res, next) => {
    const serviceRequest = await ServiceRequest.find({ user: req.user._id });
    if (serviceRequest) {
        res.status(200).json(serviceRequest);
    } else {
        res.status(400).json({
            error: "Service request not found"
        });
    }
    next();
});

exports.getAllRequestedService = asyncHandler(async (req, res, next) => {
    // populate user without password
    const serviceRequest = await ServiceRequest.find().populate("user", { password: 0 });
    if (serviceRequest) {
        res.status(200).json(serviceRequest);
    } else {
        res.status(400).json({
            error: "Service request not found"
        });
    }
    next();
});