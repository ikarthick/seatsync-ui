import {
  FETCH_AVAILABLESEATS_REQUEST, FETCH_AVAILABLESEATS_SUCCESS, FETCH_AVAILABLESEATS_FAILURE,
  SET_FORM_DATA,
  RESET_FORM,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  ticketData: [],   // API response stored here  
};

export const ticketsListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AVAILABLESEATS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AVAILABLESEATS_SUCCESS:
      return { ...state, loading: false, ticketData: action.payload };
    case FETCH_AVAILABLESEATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
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