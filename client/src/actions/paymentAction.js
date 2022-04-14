import axios from "axios";
import { INCOMMING_PAYMENT_REQUEST, INCOMMING_PAYMENT_SUCCESS, INCOMMING_PAYMENT_FAILURE } from "../constants/PaymentConstants";

export const getIncommingPayment = (id) => async (dispatch, getState) => {
    dispatch({
        type: INCOMMING_PAYMENT_REQUEST,
    });
    
    const { userLogin: { userInfo } } = getState();
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    try {
        await axios.post(`create-checkout-session/${id}`, config);
    
        dispatch({
        type: INCOMMING_PAYMENT_SUCCESS,
        });
    } catch (error) {
        dispatch({
        type: INCOMMING_PAYMENT_FAILURE,
        payload: error.response?.data.error
            ? error.response.data.error
            : error.response,
        });
    }
    }
