import axios from "axios";
import {
    INCOMMING_SERVICE_REQUEST_REQUEST,
    INCOMMING_SERVICE_REQUEST_SUCCESS,
    INCOMMING_SERVICE_REQUEST_FAILURE,
    USER_REQUESTED_SERVICE_REQUEST,
    USER_REQUESTED_SERVICE_SUCCESS,
    USER_REQUESTED_SERVICE_FAILURE,
    USER_REQUESTED_SERVICE_LIST_REQUEST,
    USER_REQUESTED_SERVICE_LIST_SUCCESS,
    USER_REQUESTED_SERVICE_LIST_FAILURE,
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

        const { data } = await axios.post(`/api/request`, {
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


export const userRequestedServices = () => async (dispatch, getState) => {
    
        try {
            dispatch({
                type: USER_REQUESTED_SERVICE_REQUEST,
            });
    
            const { userLogin: { userInfo } } = getState();
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
    
            const { data } = await axios.get(`/api/requested-service-by-user`, config);
    
            dispatch({
                type:  USER_REQUESTED_SERVICE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_REQUESTED_SERVICE_FAILURE,
                payload: error.response?.data.error
                    ? error.response.data.error
                    : error.response,
            });
        }
    
}


export const userRequestedServiceLists = () => async (dispatch, getState) => {
        
        try {
            dispatch({
                type: USER_REQUESTED_SERVICE_LIST_REQUEST,
            });
        
            const { userLogin: { userInfo } } = getState();
        
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
        
            const { data } = await axios.get(`/api/requested-service-list`, config);
        
            dispatch({
                type:  USER_REQUESTED_SERVICE_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_REQUESTED_SERVICE_LIST_FAILURE,
                payload: error.response?.data.error
                    ? error.response.data.error
                    : error.response,
            });
        }
    
    }