import axios from "axios";
import {
    INCOMMING_SERVICE_REQUEST_REQUEST,
    INCOMMING_SERVICE_REQUEST_SUCCESS,
    INCOMMING_SERVICE_REQUEST_FAILURE,
    SERVICE_REQUESTED_REQUEST,
    SERVICE_REQUESTED_SUCCESS,
    SERVICE_REQUESTED_FAILURE,
} from "../constants/serviceRequestConstants";

export const incommingService = (model, make, year, number_plate, service_type, service_description, service_requiredin_address) => async (dispatch, getState) => {

    try {
        dispatch({
            type: INCOMMING_SERVICE_REQUEST_REQUEST,
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/serviceRequest`, {
            model,
            make,
            year,
            number_plate,
            service_type,
            service_description,
            service_requiredin_address
        }, config);

        dispatch({
            type: INCOMMING_SERVICE_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOMMING_SERVICE_REQUEST_FAILURE,
            payload: error.response?.data.error
                ? error.response.data.error
                : error.response,
        });
    }

};


export const getServices = () => async (dispatch, getState) => {
    
        try {
            dispatch({
                type: SERVICE_REQUESTED_REQUEST,
            });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
    
            const { data } = await axios.get(`/api/serviceRequested`, config);
    
            dispatch({
                type: SERVICE_REQUESTED_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: SERVICE_REQUESTED_FAILURE,
                payload: error.response?.data.error
                    ? error.response.data.error
                    : error.response,
            });
        }
    
    }