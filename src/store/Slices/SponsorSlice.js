import { createSlice } from "@reduxjs/toolkit";
import { incrementLoadedSection } from "./GlobalSlice";
const initialState = {
  sponsorsByCategories: null,
  loading: false,
  error: null,
};

export const sponsorSlice = createSlice({
  name: "sponsor",
  initialState,
  reducers: {
    getSponsors: (state, {payload}) => {
      state.loading = true;
    },
    setSponsors: (state, { payload }) => {
      state.sponsorsByCategories = payload.sponsors;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSponsors, setSponsors, setError } = sponsorSlice.actions;

export const sponsorSelector = (state) => state.sponsor;

export default sponsorSlice.reducer;

export const fetchSponsors = (url) => {
  return async (dispatch) => {
    dispatch(getSponsors());    
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/sponsors`);
      const res = await response.json();
      console.log(res.data.sponsors);
      dispatch(setSponsors(res.data));
      dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
