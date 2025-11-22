
// src/redux/actions.js
import { SET_FORM_DATA, RESET_FORM, FETCH_TICKET_REQUEST, FETCH_TICKET_SUCCESS, FETCH_TICKET_FAILURE,CANCEL_TICKET_REQUEST,
  CANCEL_TICKET_SUCCESS,
  CANCEL_TICKET_FAILURE, } from "./actionTypes";
import axios from "axios";

export const setFormData = (field, value) => ({
  type: SET_FORM_DATA,
  payload: { field, value },
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const fetchTicketRequest = () => ({ type: FETCH_TICKET_REQUEST });
export const fetchTicketSuccess = (data) => ({ type: FETCH_TICKET_SUCCESS, payload: data });
export const fetchTicketFailure = (error) => ({ type: FETCH_TICKET_FAILURE, payload: error });


// Thunk for API call
// Thunk action
export const fetchTicketDetails = (employeeId) => async (dispatch) => {
  dispatch(fetchTicketRequest());
  try {
    const res = await axios.post(
      `https://seatn-sync-production.up.railway.app/infy/emp/${employeeId}/seat`,
      {
        // ✅ payload goes here
        empId: employeeId,   // dynamic if needed       
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // axios auto-parses JSON → use res.data
    dispatch(fetchTicketSuccess(res.data.empSeats));
    console.log("BookedTickets", res.data.empSeats);
  } catch (err) {
    dispatch(fetchTicketFailure(err.message));
  }
};

export const cancelTicket = (bookingId, waitListId) => async (dispatch) => {
  dispatch({ type: CANCEL_TICKET_REQUEST });

  try {
    const response = await axios.post("https://seatn-sync-production.up.railway.app/infy/seats/cancel", {
      bookingId,
      waitListId,
    });

    dispatch({
      type: CANCEL_TICKET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_TICKET_FAILURE,
      error: error.message,
    });
  }
};