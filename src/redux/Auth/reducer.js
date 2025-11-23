// src/store/authReducer.js
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes";

const initialState = {
  employeeId: "",
  token: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        employeeId: action.payload.employeeId,
               
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};