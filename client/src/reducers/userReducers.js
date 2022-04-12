const {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_INFO_RESET,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  MAKE_USER_PROFESSIONAL_REQUEST,
  MAKE_USER_PROFESSIONAL_SUCCESS,
  MAKE_USER_PROFESSIONAL_FAILURE,
} = require("../constants/userConstants");

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_INFO_RESET:
      return {};
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_PROFILE_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const userListReducer = (state = { usrs: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, usrs: action.payload }
    case USER_LIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const makeUserProfessionalReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_USER_PROFESSIONAL_REQUEST:
      return { loading: true };
    case MAKE_USER_PROFESSIONAL_SUCCESS:
      return { loading: false, success: true };
    case MAKE_USER_PROFESSIONAL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
