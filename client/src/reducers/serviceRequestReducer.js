const {

    INCOMMING_SERVICE_REQUEST_REQUEST,
    INCOMMING_SERVICE_REQUEST_SUCCESS,
    INCOMMING_SERVICE_REQUEST_FAILURE,
    SERVICE_REQUESTED_REQUEST,
    SERVICE_REQUESTED_SUCCESS,
    SERVICE_REQUESTED_FAILURE,
} = require("../constants/serviceRequestConstants");


export const incommingServiceRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOMMING_SERVICE_REQUEST_REQUEST:
            return { loading: true };
        case INCOMMING_SERVICE_REQUEST_SUCCESS:
            return { loading: false, success: true };
        case INCOMMING_SERVICE_REQUEST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const getAllServicesReducer = (state = { services: [] }, action) => {
    switch (action.type) {
        case SERVICE_REQUESTED_REQUEST:
            return { loading: true };
        case SERVICE_REQUESTED_SUCCESS:
            return { loading: false, success: true, services: action.payload };
        case SERVICE_REQUESTED_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
