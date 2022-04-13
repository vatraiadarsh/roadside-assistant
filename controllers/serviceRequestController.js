const ServiceRequest = require("../models/serviceRequestModel");
const asyncHandler = require("express-async-handler");
const geocoder = require("../utils/geocoader");
const stripe = require("stripe")('sk_test_51Ko29zJRs3JxT9wsThV502e8WCkzYb4FYuaxw1WVRWKOo7pMsRChcAlXrRQF0ypLAFcK4p0hStldGrYQw3JqNdig00obutY7qF');
const express = require("express");
const app = express();


exports.IncommingServiceRequest = asyncHandler(async (req, res, next) => {

    const { model, make, year, number_plate, service_type, service_description, service_requiredin_address } = req.body;

    if (!model || !make || !year || !number_plate || !service_type || !service_description || !service_requiredin_address) {
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

exports.approveRequestedService = asyncHandler(async (req, res, next) => {
    const serviceRequest = await ServiceRequest.findById(req.params.id);
    if (serviceRequest) {
        // update the price,status,accepted_by
        const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    price: req.body.price,
                    status: 'Accepted',
                    accepted_by: req.user._id
                }
            },
            { new: true }
        );
        res.status(200).json(updatedServiceRequest);
    } else {
        res.status(400).json({
            error: "Service request not found"
        });
    }


});

exports.viewAcceptedService = asyncHandler(async (req, res, next) => {
    const serviceRequest = await ServiceRequest.find({ $or: [{ "status": "Accepted" }, { "status": "Paid" }] }).populate("accepted_by", { password: 0 });

    if (serviceRequest) {
        res.status(200).json(serviceRequest);
    } else {
        res.status(400).json({
            error: "Service request not found"
        });
    }
});