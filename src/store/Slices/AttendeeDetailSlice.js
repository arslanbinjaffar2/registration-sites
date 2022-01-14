import { createSlice } from "@reduxjs/toolkit";
import { incrementLoadedSection } from "./GlobalSlice";
const initialState = {
  attendee: null,
  loading: false,
  error: null,
};

export const attendeeDetailSlice = createSlice({
  name: "attendeeDetail",
  initialState,
  reducers: {
    getAttendee: (state, {payload}) => {
      state.loading = true;
      state.attendee = null;
    },
    setAttendee: (state, { payload }) => {
      state.attendee = payload.data;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAttendee, setAttendee, setError } = attendeeDetailSlice.actions;

export const attendeeDetailSelector = (state) => state.attendeeDetail;

export default attendeeDetailSlice.reducer;

export const fetchAttendeeDetail = (url,  id) => {
    return async (dispatch) => {
    dispatch(getAttendee());
    let endPoint = `/event/${url}/attendees/${id}`; 
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}${endPoint}`);
      const res = await response.json();
      dispatch(setAttendee(res));
      dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError());
    }
  };
};
