import { createSlice } from "@reduxjs/toolkit";
import { incrementLoadedSection } from "./GlobalSlice";
const initialState = {
  speaker: null,
  loading: false,
  error: null,
};

export const speakerDetailSlice = createSlice({
  name: "speakerDetail",
  initialState,
  reducers: {
    getSpeaker: (state) => {
      state.loading = true;
      state.speaker = null;
    },
    setSpeaker: (state, { payload }) => {
      state.speaker = payload.data;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSpeaker, setSpeaker, setError } = speakerDetailSlice.actions;

export const speakerDetailSelector = (state) => state.speakerDetail;

export default speakerDetailSlice.reducer;

export const fetchSpeakerDetail = (url, id) => {
    return async (dispatch) => {
    dispatch(getSpeaker());
    let endPoint = `/event/${url}/speakers/${id}`; 
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}${endPoint}`);
      const res = await response.json();
      dispatch(setSpeaker(res));
      dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError());
    }
  };
};
