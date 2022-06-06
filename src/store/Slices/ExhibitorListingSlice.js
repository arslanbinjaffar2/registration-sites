import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  exhibitors: null,
  exhibitorCategories:null,
  labels: null,
  loading: false,
  error: null,
};

export const exhibitorListingSlice = createSlice({
  name: "exhibitorListing",
  initialState,
  reducers: {
    getExhibitors: (state, {payload}) => {
      state.loading = true;
    },
    setExhibitors: (state, { payload }) => {
      state.exhibitors = payload.data.exhibitors;
      state.labels = payload.labels;
      state.exhibitorCategories = payload.data.exhibitorCategories;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getExhibitors, setExhibitors, setError } = exhibitorListingSlice.actions;

export const exhibitorListingSelector = (state) => state.exhibitorListing;

export default exhibitorListingSlice.reducer;

export const fetchExhibitors = (url) => {
  return async (dispatch) => {
    dispatch(getExhibitors());    
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/exhibitors-listing`);
      const res = await response.json();
      dispatch(setExhibitors(res));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
