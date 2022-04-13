const {

    INCOMMING_SERVICE_REQUEST_REQUEST,
    INCOMMING_SERVICE_REQUEST_SUCCESS,
    INCOMMING_SERVICE_REQUEST_FAILURE,
    USER_REQUESTED_SERVICE_REQUEST,
    USER_REQUESTED_SERVICE_SUCCESS,
    USER_REQUESTED_SERVICE_FAILURE,
    USER_REQUESTED_SERVICE_LIST_REQUEST,
    USER_REQUESTED_SERVICE_LIST_SUCCESS,
    USER_REQUESTED_SERVICE_LIST_FAILURE,
    APPROVE_REQUESTED_SERVICE_REQUEST,
    APPROVE_REQUESTED_SERVICE_SUCCESS,
    APPROVE_REQUESTED_SERVICE_FAILURE,
    VIEW_ACCEPTED_SERVICE_REQUEST,
    VIEW_ACCEPTED_SERVICE_SUCCESS,
    VIEW_ACCEPTED_SERVICE_FAILURE,

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


export const userRequestedServiceReducer = (state = { services: [] }, action) => {
    switch (action.type) {
        case USER_REQUESTED_SERVICE_REQUEST:
            return { loading: true };
        case USER_REQUESTED_SERVICE_SUCCESS:
            return { loading: false, success: true, services: action.payload };
        case USER_REQUESTED_SERVICE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userRequestedServiceListReducer = (state = { allServices: [] }, action) => {
    switch (action.type) {
        case USER_REQUESTED_SERVICE_LIST_REQUEST:
            return { loading: true };
        case USER_REQUESTED_SERVICE_LIST_SUCCESS:
            return { loading: false, success: true, allServices: action.payload };
        case USER_REQUESTED_SERVICE_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const approveRequestedServiceReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_REQUESTED_SERVICE_REQUEST:
            return { loading: true };
        case APPROVE_REQUESTED_SERVICE_SUCCESS:
            return { loading: false, success: true };
        case APPROVE_REQUESTED_SERVICE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const viewAcceptedServiceReducer = (state = { acceptedServices: [] }, action) => {
    switch (action.type) {
        case VIEW_ACCEPTED_SERVICE_REQUEST:
            return { loading: true };
        case VIEW_ACCEPTED_SERVICE_SUCCESS:
            return { loading: false, success: true, acceptedServices: action.payload };
        case VIEW_ACCEPTED_SERVICE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}