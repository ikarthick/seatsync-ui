
// src/redux/actions.js
import {  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes";


export const loginStart = () => ({ type: LOGIN_START });
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, error });
export const logout = () => ({ type: LOGOUT });

// // Thunk for API call
// export const fetchTicketDetails = () => async (dispatch) => {
//   dispatch(AvailableTicket_Request());
//   try {
//     const res = await fetch("https://seatn-sync-production.up.railway.app/infy/seats/availability");
//     const data = await res.json();
//     await dispatch(AvailableTicket_Success(data)); // store only cityList
//     console.log("AvailableSeats",data)
//   } catch (err) {
//     dispatch(AvailableTicket_Failure(err.message));
//   }
// };