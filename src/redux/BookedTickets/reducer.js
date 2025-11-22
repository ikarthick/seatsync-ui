import {
  FETCH_TICKET_REQUEST, FETCH_TICKET_SUCCESS, FETCH_TICKET_FAILURE,
  SET_FORM_DATA,
  RESET_FORM,
  CANCEL_TICKET_REQUEST,
  CANCEL_TICKET_SUCCESS,
  CANCEL_TICKET_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  dcData: [],   // API response stored here
  dates:[],
  bookingType: "",
  city: "",
  branch: "",
  block: "",
  wing: "",
  tickets: [],
  // seatType: "",
  // row: "",
  // seatNumber: "",
  // startTime: "",
  // endTime: ""
};

export const ticketsListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKET_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TICKET_SUCCESS:
      return { ...state, loading: false, bookedData: action.payload };
    case FETCH_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CANCEL_TICKET_REQUEST:
      return { ...state, loading: true };
    case CANCEL_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload
      };
    case CANCEL_TICKET_FAILURE:
      return { ...state, loading: false, error: action.error };  
    case SET_FORM_DATA:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};