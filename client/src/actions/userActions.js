import axios from "axios";
import {API} from "../utils";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../constants/userConstants";

export const register =
  (
    title,
    firstName,
    lastName,
    gender,
    email,
    date_of_birth,
    mobile_number,
    address,
    password
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/register`,
        {
          title,
          first_name: firstName,
          last_name: lastName,
          gender,
          email,
          date_of_birth,
          mobile_number,
          address,
          password,
        },
        config
      );

      dispatch({
          type:USER_REGISTER_SUCCESS,
          payload:data
      })

      localStorage.setItem("userInfo",JSON.stringify(data));

    } catch (error) {
        console.log(error);
        dispatch({
            type:USER_REGISTER_FAILURE,
            payload:error.response?.data.error ? error.response.data.error : error.response
        })
    }
  };
