import axios from "axios";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_INFO_RESET,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,
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
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error.response?.data.error
          ? error.response.data.error
          : error.response,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/login`,
      {
        email,
        password,
      },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response?.data.error
        ? error.response.data.error
        : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_SUCCESS });
  dispatch({ type: USER_INFO_RESET });
};

export const updateProfile =
  (
    title,
    first_name,
    last_name,
    gender,
    email,
    date_of_birth,
    mobile_number,
    address
  ) =>
  async (dispatch,getState) => {
    try {
      dispatch({
        type: USER_PROFILE_UPDATE_REQUEST,
      });

      const{userLogin:{userInfo}} = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const {data} = await axios.put(`/api/profile`, {
        title,
        first_name,
        last_name,
        gender,
        email,
        date_of_birth,
        mobile_number,
        address
      }, config);

      dispatch({
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload:data
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAILURE,
        payload: error.response?.data.error
          ? error.response.data.error
          : error.response,
      });
    }
  };
